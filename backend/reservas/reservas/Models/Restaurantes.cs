using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reservas.Data;

namespace reservas.Models
{
    public class Restaurantes : AppDataObject
    {
        [MaxLength(64)]
        public string Descricao { get; set; }

        [MaxLength(120)]
        public string Endereco { get; set; }

        [MaxLength(64)]
        public float Avaliacao { get; set; }

        public string Infos { get; set; }

        public long CidadeId { get; set; }
        [ForeignKey("CidadeId")]
        public Cidades Cidade { get; set; }
    }
}
