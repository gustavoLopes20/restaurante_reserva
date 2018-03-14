using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reservas.Data;

namespace reservas.Models
{
    public class Usuarios : AppDataObject
    {
        [MaxLength(64)]
        public string Nome { get; set; }

        [MaxLength(64)]
        public string Email { get; set; }

        [MaxLength(64)]
        public string SenhaCript { get; set; }
    }
}
