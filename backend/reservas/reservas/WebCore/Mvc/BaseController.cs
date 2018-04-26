using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using reservas.Models;
using reservas.CommunicationModels;
using reservas.CommunicationModels.Access.Request;
using reservas.CommunicationModels.Access.Response;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace reservas.WebCore.Mvc
{
    public class BaseController : Controller
    {
        protected readonly ReservasContext context;
        private Sessoes _sessaoUsuario = null;
      

        public BaseController(ReservasContext _context)
        {
            context = _context;
        }

        public static string CriptSenha(string input = "")
        {
            System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
            byte[] hash = md5.ComputeHash(inputBytes);
            System.Text.StringBuilder sb = new System.Text.StringBuilder();

            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            return sb.ToString();
        }

        protected List<Components> LstComponents
        {
            get
            {
                return LerArquivoJson<Components>("configComponents.json");
            }
        }

        public List<T> LerArquivoJson<T>(string arquivoUri)
        {
            try
            {
                using (StreamReader r = new StreamReader(arquivoUri))
                {
                    string json = r.ReadToEnd();
                    var lst = JsonConvert.DeserializeObject<List<T>>(json);
                    r.Close();

                    return lst;
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public static bool GravarArquivoJson<T>(string arquivoUri, List<T> lista)
        {
            try
            {
                using (StreamWriter r = new StreamWriter(arquivoUri))
                {
                    string strJson = JsonConvert.SerializeObject(lista, Formatting.Indented);
                    r.Write(strJson);
                    r.Close();

                    return true;
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        protected string TokenSessao
        {
            get {
                var header = HttpContext.Request.Headers.ToList();
                Sessoes session;

                foreach(string token1 in Request.Headers["access_token"])
                {
                    if(token1 != "")
                    {
                        session = context.Sessoes.Include(a => a.Usuario).FirstOrDefault(a => a.Token == token1);

                        if(session != null)
                        {
                            SessaoUsuario = session;

                            return session.Token;
                        }
                    }
                }
                return null;
            }        
        }


        public Sessoes SessaoUsuario
        {
            get
            {
                if(TokenSessao != "")
                {
                    _sessaoUsuario = context.Sessoes.Include(u => u.Usuario).FirstOrDefault(a => a.Token == TokenSessao);
                    if(_sessaoUsuario != null)
                    {
                        var permissoes = context.Permissoes.Where(a => a.UsuarioId == _sessaoUsuario.UsuarioId).ToList();
                        _sessaoUsuario.PermissoesUsuario = permissoes;
                    }
                    return _sessaoUsuario;
                }
                else
                {
                    return _sessaoUsuario = null;
                }
            }
            set
            {
                _sessaoUsuario = value;
            }
        }

        public bool Autenticou
        {
            get
            {
                return SessaoUsuario != null;
            }
        }

        public class Components
        {
            public int Id { get; set; }
            public string Descricao { get; set; }
            public int ComponentPai { get; set; }
        }

    }
}
