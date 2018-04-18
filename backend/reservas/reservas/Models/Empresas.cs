using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reservas.WebCore;

namespace reservas.Models
{
    public class Empresas : AppDataObject
    {
        [MaxLength(100)]
        public string NomeFantasia {get; set;}

        [MaxLength(100)]
        public string RazaoSocial {get; set;}

        [MaxLength(32)]
        public string CodEmpresa {get; set;}

        [MaxLength(32)]
        public string Cnpj {get; set;}

        [MaxLength(32)]
        public string InsEstadual {get; set;}

        [MaxLength(20)]
        public string Cep { get; set; }

        [MaxLength(50)]
        public string Rua { get; set; }

        public int Num { get; set; }

        [MaxLength(50)]
        public string Complemento { get; set; }

        [MaxLength(50)]
        public string Bairro { get; set; }

        [MaxLength(10)]
        public string Estado { get; set; }

        [MaxLength(45)]
        public string Cidade { get; set; }

        [MaxLength(32)]
        public string Telefone { get; set; }

        [MaxLength(70)]
        public string Email { get; set; }

        public Usuarios Usuario { get; set; }
        [ForeignKey("Usuario")]
        public long UsuarioId { get; set; }

    }
}
