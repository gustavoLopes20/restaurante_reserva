using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using reservas.Models;
using reservas.Data;
using reservas.Mvc;
using reservas.CommunicationModels;

namespace reservas.Controllers
{
    [Route("api/[controller]")]
    public class CidadesController : BaseController
    {
        public CidadesController(ReservasContext context) :base(context)
        { }

        // GET api/Cidades
        [HttpGet]
        public List<Cidades> ListarCidades()
        {
            return context.Cidades.ToList();
        }

        // GET api/Cidades/{rid}
        [HttpGet("{rid}")]
        public Cidades PorRid([FromRoute] string rid)
        {
            return context.Cidades.First(a => a.RID == rid);
        }

        // POST api/Cidades
        [HttpPost]
        public DefaultResponseModel Salvar([FromBody] Cidades Model)
        {
            context.Cidades.Update(Model);
            context.SaveChanges();

            return new DefaultResponseModel
            {
                Mensagem = "Salvo com sucesso!"
            };

        }

        //DELETE  api/Cidades/Delete
        [HttpPost]
        [Route("Delete")]
        public DefaultResponseModel Delete([FromBody] Cidades Model)
        {
            context.Cidades.Remove(Model);
            context.SaveChanges();

            return new DefaultResponseModel
            {
                Mensagem = "Excluido com sucesso!"
            };
        }
    }
}
