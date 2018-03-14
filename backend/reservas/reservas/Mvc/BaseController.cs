using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using reservas.Data;

namespace reservas.Mvc
{
    public class BaseController : Controller
    {
        protected readonly ReservasContext context;

        public BaseController(ReservasContext _context)
        {
            context = _context;
        }
    }
}
