using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using reservas.Models;

namespace reservas.Data
{
    public class ReservasContext : DbContext
    {
        public ReservasContext(DbContextOptions<ReservasContext> options) : base(options)
        {

        }

        public DbSet<Cidades> Cidades { get; set; }
        public DbSet<Mesas> Mesas { get; set; }
        public DbSet<Reservas> Rervas { get; set; }
        public DbSet<Restaurantes> Restaurantes { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cidades>()
             .HasAlternateKey(c => c.RID)
             .HasName("RID");

            modelBuilder.Entity<Mesas>()
             .HasAlternateKey(c => c.RID)
             .HasName("RID");

            modelBuilder.Entity<Reservas>()
             .HasAlternateKey(c => c.RID)
             .HasName("RID");

            modelBuilder.Entity<Restaurantes>()
             .HasAlternateKey(c => c.RID)
             .HasName("RID");

            modelBuilder.Entity<Usuarios>()
             .HasAlternateKey(c => c.RID)
             .HasName("RID");
        }
    }
}
