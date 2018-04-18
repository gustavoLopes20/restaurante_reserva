using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reservas.WebCore;

namespace reservas.Models
{
    public class Mesas : AppDataObject
    {
        public long EmpresaId { get; set; }
        [ForeignKey("EmpresaId")]
        public Empresas Empresa { get; set; }

        public int QtdMaxPessoas { get; set; }

        public int NumMesa { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DataDisponivel { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime HorarioDisponivel { get; set; }

        [MaxLength(45)]
        public string DataFMT { get; set; }

        [MaxLength(45)]
        public string HorarioFMT { get; set; }

    }
}
