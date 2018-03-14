using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reservas.Data;

namespace reservas.Models
{
    public class Mesas : AppDataObject
    {
        public long RestauranteId { get; set; }
        [ForeignKey("RestauranteId")]
        public Restaurantes Restaurante { get; set; }

        [MaxLength(64)]
        public string Descricao { get; set; }

        public int QtdMaxPessoas { get; set; }

        public bool Status { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime Data { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime Horario { get; set; }

        [MaxLength(45)]
        public string DataFMT { get; set; }

        [MaxLength(45)]
        public string HorarioFMT { get; set; }

    }
}
