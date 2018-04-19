using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reservas.WebCore;

namespace reservas.Models
{
    public class Sessoes : AppDataObject
    {
     
        public Usuarios Usuario { get; set; }
        [ForeignKey("Usuario")]
        public long UsuarioId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? UltimoLogin { get; set; }


        private string _token = null;

        public Sessoes()
        {
            _token = GenerateUniqueRID(true);
        }


        [MaxLength(64)]
        public string Token
        {
            get
            {
                return _token;
            }
            set
            {
                _token = value;
            }
        }

    }
}
