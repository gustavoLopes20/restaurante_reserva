using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reservas.CommunicationModels.Access.Response
{
    public class LoginResponseModel
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public string Redirect { get; set; }
    }
}

