using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using reservas.Models;

namespace reservas.WebCore
{
    public class ReservasContext : DbContext
    {
        public ReservasContext(DbContextOptions<ReservasContext> options) : base(options)
        {}

        public DbSet<Mesas> Mesas { get; set; }
        public DbSet<ReservasMesas> ReservasMesas { get; set; }
        public DbSet<Empresas> Empresas { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Sessoes> Sessoes { get; set; }
        public DbSet<AvaliacoesEmpresas> AvaliacoesEmpresas { get; set; }
        public DbSet<Pessoas> Pessoas { get; set; }
        public DbSet<Permissoes> Permissoes { get; set; }
        public DbSet<InfosEmpresas> InfosEmpresas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Mesas>()
                 .HasAlternateKey(c => c.RID)
                 .HasName("RID");

            modelBuilder.Entity<ReservasMesas>()
                 .HasAlternateKey(c => c.RID)
                 .HasName("RID");

            modelBuilder.Entity<Empresas>()
                 .HasAlternateKey(c => c.RID)
                 .HasName("RID");

            modelBuilder.Entity<Usuarios>()
                 .HasAlternateKey(c => c.RID)
                 .HasName("RID");

            modelBuilder.Entity<Sessoes>()
             .HasAlternateKey(c => c.RID)
             .HasName("RID");

            modelBuilder.Entity<AvaliacoesEmpresas>()
                 .HasAlternateKey(c => c.RID)
                 .HasName("RID");

            modelBuilder.Entity<Pessoas>()
             .HasAlternateKey(c => c.RID)
             .HasName("RID");

            modelBuilder.Entity<Permissoes>()
                .HasAlternateKey(c => c.RID)
                .HasName("RID");


            modelBuilder.Entity<InfosEmpresas>()
                 .HasAlternateKey(c => c.RID)
                 .HasName("RID");
        }
    }
}
