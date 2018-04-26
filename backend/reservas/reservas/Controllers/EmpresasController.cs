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

namespace reservas.Controllers
{
    [Route("api/[controller]")]
    public class EmpresasController : BaseController
    {
        public EmpresasController(ReservasContext context) :base(context)
        { }

        // GET api/Empresas
        [HttpGet]
        public List<Empresas> ListarPor([FromQuery] string cidade = "", [FromQuery] string user = "")
        {
            var rgx = new Regex("[^a-zA-Z -]");
            var rgx2 = new Regex("[^0-9A-Z -]");

            if (cidade != "")
            {   cidade = rgx.Replace(cidade, " ");

                return context.Empresas.Where(e => e.Cidade.ToUpper() == cidade.ToUpper()).ToList();

            }else if(user != "" && Autenticou)
            {
                user = rgx2.Replace(user, "");
                return context.Empresas.Where(a => a.Usuario.RID == user).ToList();
            }
            else
            {
                //HttpContext.Response.StatusCode = 404;
                return null;
            }
        }

        // GET api/Empresas/{rid}
        [HttpGet("{rid}")]
        public Empresas PorRid([FromRoute] string rid)
        {
            return context.Empresas.FirstOrDefault(a => a.RID == rid);
        }

        // POST api/Empresas
        [HttpPost]
        public DefaultResponseModel Salvar([FromBody] Empresas Model)
        {
            try
            {
                if (Autenticou)
                {
                    context.Empresas.Update(Model);
                    context.SaveChanges();

                    return new DefaultResponseModel
                    {
                        Mensagem = "Salvo com sucesso!"
                    };
                }

                return new DefaultResponseModel
                {
                    Mensagem = "Usuário não autenticado"
                };
            }
            catch (Exception e)
            {
                return new DefaultResponseModel
                {
                    Mensagem = "Erro no servidor!"+e.Message,
                    Sucesso = false
                };
            }
        }

        //DELETE  api/Empresas/Delete
        [HttpPost]
        [Route("Delete")]
        public DefaultResponseModel Delete([FromBody] Empresas Model)
        {
            try
            {
                if (Autenticou)
                {
                    context.Empresas.Remove(Model);
                    context.SaveChanges();

                    return new DefaultResponseModel
                    {
                        Mensagem = "Excluido com sucesso!"
                    };
                }

                return new DefaultResponseModel
                {
                    Mensagem = "Usuário não autenticado"
                };

            }
            catch(Exception e)
            {
                return new DefaultResponseModel
                {
                    Mensagem = "Erro no servidor!"+e.Message,
                    Sucesso = false
                };
            }
        }
    }
}
