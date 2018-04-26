using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using reservas.Models;
using reservas.CommunicationModels;

using Microsoft.AspNetCore.Cors;
using reservas.CommunicationModels.Access.Request;
using reservas.CommunicationModels.Access.Response;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using reservas.WebCore;
using reservas.WebCore.Mvc;
using System.IO;
using Newtonsoft.Json;


namespace reservas.Controllers
{
    [Route("api/[controller]")]
    public class AcessoController : BaseController
    {
        public AcessoController(ReservasContext context) : base(context)
        {
        }

        //Cadastro
        [HttpPost]
        [Route("[action]")]
        public DefaultResponseModel Cadastro([FromBody] CadastroUsuariosModel Model)
        {
            var rg = new Regex(@"^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$");

            if (rg.IsMatch(Model.Email))
            {
                string senhaCript = CriptSenha(Model.Senha);

                Model.Email = Model.Email.ToLower();

                var existente = context.Usuarios.Any(u => u.Email == Model.Email);

                if (!existente)
                {
                    var pessoa = new Pessoas
                    {
                        Nome = Model.NomeUsuario,
                        Email = Model.Email
                    };

                    context.Pessoas.Add(pessoa);

                    var usuario = new Usuarios
                    {
                        Senha = senhaCript,
                        Email = Model.Email,
                        Login = Model.NomeUsuario,
                        PessoaId = pessoa.Id
                    };

                    context.Usuarios.Add(usuario);

                    // component de usuario
                    var defaultpermission1 = new Permissoes
                    {
                        UsuarioId = usuario.Id,
                        Component = 3290
                    };

                    // component de usuario comum
                    var defaultpermission2 = new Permissoes
                    {
                        UsuarioId = usuario.Id,
                        Component = 4486
                    };

                    // component de perfil
                    var defaultpermission3 = new Permissoes
                    {
                        UsuarioId = usuario.Id,
                        Component = 1456,
                        Excluir = true
                    };

                    // component de reservas
                    var defaultpermission4 = new Permissoes
                    {
                        UsuarioId = usuario.Id,
                        Component = 7645,
                        Excluir = true
                    };

                    context.Permissoes.Add(defaultpermission1);
                    context.Permissoes.Add(defaultpermission2);
                    context.Permissoes.Add(defaultpermission3);
                    context.Permissoes.Add(defaultpermission4);
                    context.SaveChanges();

                    var consulta = context.Usuarios.Any(u => u.Id == usuario.Id);

                    if (consulta)
                    {
                        return new DefaultResponseModel
                        {
                            Sucesso = true,
                            Mensagem = "Usuário cadastrado com sucesso."
                        };
                    }
                    else
                    {
                        return new DefaultResponseModel
                        {
                            Sucesso = false,
                            Mensagem = "Erro ao cadastrado."
                        };
                    }
                }
                else
                {
                    return new DefaultResponseModel
                    {
                        Sucesso = false,
                        Mensagem = "Usuário existente"
                    };
                }

            }
            else
            {
                return new DefaultResponseModel
                {
                    Sucesso = false,
                    Mensagem = "E-mail inválido."
                };
            }
        }

        // /api/acesso/Login
        [HttpPost]
        [Route("[action]")]
        public LoginResponseModel Login([FromBody] LoginRequestModel Model)
        {
            string senhaCript = CriptSenha(Model.Senha);

            var rg = new Regex(@"^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$");

            if (rg.IsMatch(Model.Email))
            {
                Model.Email = Model.Email.ToLower();

                var user = context.Usuarios.Include(u => u.Pessoa).FirstOrDefault(a => a.Email == Model.Email && a.Senha == senhaCript);
                
                if (user != null)
                {
                    var sessaousuario = new Sessoes
                    {
                        Usuario = user,
                    };

                    context.Sessoes.Add(sessaousuario);
                    context.SaveChanges();


                    return new LoginResponseModel
                    {
						Token = sessaousuario.Token,
                        UserName = sessaousuario.Usuario.Pessoa.Nome,
                        UserNivel = sessaousuario.Usuario.Nivel,
                        Mensagem = "Login Efetuado com sucesso."
                    };
                }
                else
                {
                    return new LoginResponseModel
                    {
                        Sucesso = false,
                        Mensagem = "Usuário ou senha incorreto."
                    };
                }
            }
            else
            {
                return new LoginResponseModel
                {
                    Sucesso = false,
                    Mensagem = "E-mail inválido."
                };
            }
        }

        // /api/acesso/Sessoes
        [HttpGet]
        [Route("[action]")]
        public SessoesResponseModel Sessoes()
        {
             if (Autenticou)
             {

                 var lstPermissoes = context.Permissoes.Where(a => a.UsuarioId == SessaoUsuario.UsuarioId).ToList();

                  return new SessoesResponseModel
                  {
                        Token = SessaoUsuario.Token,
                        UserName = SessaoUsuario.Usuario.Login,
                        UserId = SessaoUsuario.UsuarioId,
                        UserRID = SessaoUsuario.Usuario.RID,
                        UserNivel = SessaoUsuario.Usuario.Nivel,
                        PermissoesUser = lstPermissoes,
                        Mensagem = "Autenticado com sucesso."
                   };
             }
             else
             {
                 return new SessoesResponseModel
                 {
                     Sucesso = false,
                     Mensagem = "Não autenticado."
                 };
             }
            
        }

    }

}

