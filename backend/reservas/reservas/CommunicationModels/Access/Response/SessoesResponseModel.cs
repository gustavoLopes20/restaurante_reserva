using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using reservas.Models;

namespace reservas.CommunicationModels.Access.Response
{
    public class SessoesResponseModel
    {
        public string Token { get; set; }
        public string Mensagem { get; set; }
        public bool Sucesso { get; set; } = true;
        public string UserName { get; set; }
        public long UserId { get; set; }
        public List<Permissoes> PermissoesUser { get; set; }
    }
}
