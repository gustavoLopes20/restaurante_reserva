using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reservas.Data;

namespace reservas.Models
{
    public class Cidades : AppDataObject
    {

        [MaxLength(45)]
        public string Descricao { get; set; }

        [MaxLength(2)]
        public string Uf { get; set; }
    }
}
