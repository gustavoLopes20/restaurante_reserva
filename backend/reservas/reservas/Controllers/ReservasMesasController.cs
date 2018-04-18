using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using reservas.Models;
using reservas.CommunicationModels;
using reservas.WebCore;
using reservas.WebCore.Mvc;

namespace reservas.Controllers
{
    [Route("api/[controller]")]
    public class ReservasMesasController : BaseController
    {
        public ReservasMesasController(ReservasContext context) :base(context)
        { }

        // GET api/ReservasMesas
        [HttpGet]
        public List<ReservasMesas> ListarReservasMesas()
        {
            return context.ReservasMesas.ToList();
        }

        // GET api/ReservasMesas/{rid}
        [HttpGet("{rid}")]
        public ReservasMesas PorRid([FromRoute] string rid)
        {
            return context.ReservasMesas.FirstOrDefault(a => a.RID == rid);
        }

        // POST api/Mesas
        [HttpPost]
        public DefaultResponseModel Salvar([FromBody] ReservasMesas Model)
        {
            context.ReservasMesas.Update(Model);
            context.SaveChanges();

            return new DefaultResponseModel
            {
                Mensagem = "Salvo com sucesso!"
            };

        }

        //DELETE  api/ReservasMesas/Delete
        [HttpPost]
        [Route("Delete")]
        public DefaultResponseModel Delete([FromBody] ReservasMesas Model)
        {
            context.ReservasMesas.Remove(Model);
            context.SaveChanges();

            return new DefaultResponseModel
            {
                Mensagem = "Excluido com sucesso!"
            };
        }
    }
}
