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

        public int Component { get; set; }

        public int Tela { get; set; }

        public int Permissao { get; set; }
    }
}
