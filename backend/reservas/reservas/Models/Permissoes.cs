using reservas.WebCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace reservas.Models
{
    public class Permissoes : AppDataObject
    {
        public long UsuarioId { get; set; }

        [ForeignKey("UsuarioId")]
        public Usuarios Usuario { get; set; }

        public int Component {get; set;}
        public bool Consultar { get; set; } = true;
        public bool Incluir { get; set; } = true;
        public bool Editar { get; set; } = true;
        public bool Excluir { get; set; } = false;
    }
}
//public int Permissao {get; set;} // (1 - Consultar / 2 - Incluir / 3 - Editar / 4 - Excluir)