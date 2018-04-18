using reservas.WebCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace reservas.Models
{
    public class AvaliacoesEmpresas : AppDataObject
    {
        [MaxLength(200)]
        public string Descricao { get; set; }

        public int Avaliacao {get; set;}

        public long UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public Usuarios Usuario { get; set; }

        public long EmpresaId { get; set; }
        [ForeignKey("EmpresaId")]
        public Empresas Empresa { get; set; }
    }
}
