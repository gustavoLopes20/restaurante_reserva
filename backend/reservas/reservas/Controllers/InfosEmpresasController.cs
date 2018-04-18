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
    public class InfosEmpresasController : BaseController
    {
        public InfosEmpresasController(ReservasContext context) :base(context)
        { }

        // GET api/InfosEmpresas
        [HttpGet]
        public List<InfosEmpresas> ListarInfosEmpresas()
        {
            return context.InfosEmpresas.ToList();
        }

        // GET api/InfosEmpresas/{rid}
        [HttpGet("{rid}")]
        public InfosEmpresas PorRid([FromRoute] string rid)
        {
            return context.InfosEmpresas.FirstOrDefault(a => a.RID == rid);
        }

        // POST api/InfosEmpresas
        [HttpPost]
        public DefaultResponseModel Salvar([FromBody] InfosEmpresas Model)
        {
            context.InfosEmpresas.Update(Model);
            context.SaveChanges();

            return new DefaultResponseModel
            {
                Mensagem = "Salvo com sucesso!"
            };

        }

        //DELETE  api/InfosEmpresas/Delete
        [HttpPost]
        [Route("Delete")]
        public DefaultResponseModel Delete([FromBody] InfosEmpresas Model)
        {
            context.InfosEmpresas.Remove(Model);
            context.SaveChanges();

            return new DefaultResponseModel
            {
                Mensagem = "Excluido com sucesso!"
            };
        }
    }
}
