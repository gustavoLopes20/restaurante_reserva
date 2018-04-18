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
    public class AvaliacoesEmpresasController : BaseController
    {      
        public AvaliacoesEmpresasController(ReservasContext context) :base(context)
        { }

        // GET api/AvaliacoesEmpresas
        [HttpGet]
        public List<AvaliacoesEmpresas> ListarEmpresas()
        {
            return context.AvaliacoesEmpresas.ToList();
        }

        // GET api/AvaliacoesEmpresas/{rid}
        [HttpGet("{rid}")]
        public AvaliacoesEmpresas PorRid([FromRoute] string rid)
        {
            return context.AvaliacoesEmpresas.FirstOrDefault(a => a.RID == rid);
        }

        // POST api/Mesas
        [HttpPost]
        public DefaultResponseModel Salvar([FromBody] AvaliacoesEmpresas Model)
        {
            context.AvaliacoesEmpresas.Update(Model);
            context.SaveChanges();

            return new DefaultResponseModel
            {
                Mensagem = "Salvo com sucesso!"
            };

        }

        //DELETE  api/AvaliacoesEmpresas/Delete
        [HttpPost]
        [Route("Delete")]
        public DefaultResponseModel Delete([FromBody] AvaliacoesEmpresas Model)
        {
            context.AvaliacoesEmpresas.Remove(Model);
            context.SaveChanges();

            return new DefaultResponseModel
            {
                Mensagem = "Excluido com sucesso!"
            };
        }
    }
}
