using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebGordon.ViewModels;
namespace WebGordon.DAL
{
    public class EFDbContext : IdentityDbContext<DbUser, DbRole, long, IdentityUserClaim<long>,
    DbUserRole, IdentityUserLogin<long>,
    IdentityRoleClaim<long>, IdentityUserToken<long>>
    {
        public EFDbContext(DbContextOptions<EFDbContext> options)
            : base(options)
        {

        }

        public DbSet<User> SiteUsers { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductPhoto> Photos { get; set; }

        public DbSet<Torg> Torgs { get; set; }
        public DbSet<TorgBet> TorgBets { get; set; }
        public DbSet<UserTorg> UserTorgs { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            //builder.Query<BrokerProfileModel>().ToView("vBrokersProfile");

            base.OnModelCreating(builder);

            builder.Entity<DbUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
            
             
            
        }
        //public DbSet<UserTorg> UserTorgs { get; set; }


        public DbSet<WebGordon.ViewModels.TorgViewModel> TorgViewModel { get; set; }
        //public DbSet<UserTorg> UserTorgs { get; set; }


        public DbSet<WebGordon.ViewModels.UserViewModel> UserViewModel { get; set; }
        //public DbSet<UserTorg> UserTorgs { get; set; }


        public DbSet<WebGordon.ViewModels.LotViewModel> LotViewModel { get; set; }


    }
}
