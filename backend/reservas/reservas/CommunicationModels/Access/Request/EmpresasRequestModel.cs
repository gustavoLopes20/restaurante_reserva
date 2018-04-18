using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reservas.CommunicationModels.Access.Request
{
    public class EmpresasRequestModel
    {
        public string Cidade { get; set; } = "";
        public long UsuarioId { get; set; } = 0;
    }
}
