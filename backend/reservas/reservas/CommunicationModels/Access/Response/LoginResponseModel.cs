using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reservas.CommunicationModels.Access.Response
{
    public class LoginResponseModel
    {
        public string UserName { get; set; }
        public bool Sucesso { get; set; } = true;
        public string Mensagem { get; set; }
		public string Token {get; set;}
    }
}

