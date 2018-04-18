using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reservas.CommunicationModels.Access.Request
{
    public class LoginRequestModel
    {
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}
