using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using reservas.Models;

namespace reservas.Data
{
    public class InicializaBD
    {
        public static void Initialize(ReservasContext context)
        {
            context.Database.EnsureCreated();
            //context.Database.Migrate();

            //List<Cidades> cidades = new List<Cidades>
            //{
            //    new Cidades { Descricao = "Araxá", Uf = "MG" },
            //    new Cidades { Descricao = "Uberlândia", Uf = "MG" },
            //    new Cidades { Descricao = "Uberaba", Uf = "MG" },
            //    new Cidades { Descricao = "Campos Altos", Uf = "MG" },
            //};

            //foreach( var c in cidades)
            //{
            //    context.Cidades.Update(c);
            //    context.SaveChanges();
            //}

        }
    }
}
