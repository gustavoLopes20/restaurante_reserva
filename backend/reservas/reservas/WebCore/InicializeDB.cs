using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using reservas.Models;
using Microsoft.EntityFrameworkCore;

namespace reservas.WebCore
{
    public class InicializaBD
    {
        public static void Initialize(ReservasContext context)
        {
            context.Database.EnsureCreated();
            //context.Database.Migrate();
        }

    }
}
