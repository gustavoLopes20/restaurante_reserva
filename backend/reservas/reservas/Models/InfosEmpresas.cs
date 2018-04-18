using reservas.WebCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace reservas.Models
{
    public class InfosEmpresas : AppDataObject
    {
        [MaxLength(60)]
        public string Title { get; set; }

        public string Descricao { get; set; }

        public Usuarios Empresa { get; set; }
        [ForeignKey("Empresa")]
        public long EmpresaId { get; set; }
    }
}
