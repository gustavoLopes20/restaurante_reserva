using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace reservas.Data
{
    public class AppDataObject
    {

        public long Id { get; set; }

        private string _rid = null;

        [MaxLength(64)]
        public string RID { get { return _rid; } set { _rid = value; } }

        public AppDataObject()
        {
            _rid = GeradorHash(32);
        }

        public string GeradorHash(int tamanho)
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var result = new string(
                Enumerable.Repeat(chars, tamanho)
                          .Select(s => s[random.Next(s.Length)])
                          .ToArray());
            return result;
        }
    }
}


//[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//public DateTime Registro { get; set; } = DateTime.UtcNow;

//[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//public DateTime DataUpdate { get; set; } = DateTime.UtcNow;

//[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//public bool Ativo { get; set; } = true;