using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reservas.WebCore;

namespace reservas.Models
{
    public class ReservasMesas : AppDataObject
    {
        public long EmpresaId { get; set; }
        [ForeignKey("EmpresaId")]
        public Empresas Empresa { get; set; }

        public long UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public Usuarios Usuario { get; set; }

        public long MesaId { get; set; }
        [ForeignKey("MesaId")]
        public Mesas Mesa { get; set; }

        public int QtdPessoas { get; set; }
    }
}
