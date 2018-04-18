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
            var header = HttpContext.Request.Headers.ToList();
            string access_token = header[9].Value;

            if (access_token != "")
            {
                var sec = context.Sessoes.Include(a => a.Usuario);
                var sessao = sec.FirstOrDefault(a => a.Token == access_token);
             
                if (sessao != null)
                {

                    var lstPermissoes = context.Permissoes.Where(a => a.UsuarioId == sessao.UsuarioId).ToList();

                    return new SessoesResponseModel
                    {
                        Token = sessao.Token,
                        UserName = sessao.Usuario.Login,
                        UserId = sessao.UsuarioId,
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
            else
            {

                return new SessoesResponseModel
                {
                    Sucesso = false,
                    Mensagem = "Token inválido"
                };
            }
        }

    }
}

