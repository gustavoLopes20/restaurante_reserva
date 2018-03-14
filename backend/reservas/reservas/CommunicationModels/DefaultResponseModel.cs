using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reservas.CommunicationModels
{
    public class DefaultResponseModel
    {
        public bool Sucesso { get; set; } = true;
        public string Mensagem { get; set; }
        public Object Retorno { get; set; }
    }
}
