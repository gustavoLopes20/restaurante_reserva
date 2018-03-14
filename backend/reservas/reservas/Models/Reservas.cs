﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using reservas.Data;

namespace reservas.Models
{
    public class Reservas : AppDataObject
    {
        public long RestauranteId { get; set; }
        [ForeignKey("RestauranteId")]
        public Restaurantes Restaurante { get; set; }

        public long UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public Usuarios Usuario { get; set; }

        public long MesaId { get; set; }
        [ForeignKey("MesaId")]
        public Mesas Mesa { get; set; }

        public int QtdPessoas { get; set; }
    }
}
