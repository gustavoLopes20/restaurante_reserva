using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using reservas.Models;
using reservas.CommunicationModels;
using reservas.WebCore;
using reservas.WebCore.Mvc;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace reservas.Controllers
{
    [Route("api/[controller]")]
    public class MesasController : BaseController
    {
        public MesasController(ReservasContext context) :base(context)
        { }

        // GET api/Mesas
        [HttpGet]
        public List<Mesas> ListarMesas([FromQuery] string empresa, [FromQuery] string usuario = "")
        {
            if(empresa != "")
            {
                return context.Mesas.Include(a => a.Empresa).Where(m => m.Empresa.RID == empresa).ToList();
            }
            else if(usuario != "")
            {
                var c = context.Mesas.Include(a => a.Empresa);
                var z = c.Include(a => a.Empresa.Usuario);
                    
                return z.Where(a=> a.Empresa.Usuario.RID == usuario).ToList();
            }
            return context.Mesas.Include(e => e.Empresa).ToList();
        }

        // GET api/Mesas/{rid}
        [HttpGet("{rid}")]
        public Mesas PorRid([FromRoute] string rid)
        {
            return context.Mesas.FirstOrDefault(a => a.RID == rid);
        }

        // POST api/Mesas
        [HttpPost]
        public DefaultResponseModel Salvar([FromBody] Mesas Model)
        {
            context.Mesas.Update(Model);
            context.SaveChanges();

            return new DefaultResponseModel
            {
                Mensagem = "Salvo com sucesso!"
            };

        }

        //DELETE  api/Mesas/Delete
        [HttpPost]
        [Route("Delete")]
        public DefaultResponseModel Delete([FromBody] Mesas Model)
        {
            context.Mesas.Remove(Model);
            context.SaveChanges();

            return new DefaultResponseModel
            {
                Mensagem = "Excluido com sucesso!"
            };
        }
    }
}
