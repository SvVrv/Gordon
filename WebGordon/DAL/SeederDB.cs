using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.DAL
{
    public  class SeederDB
    {
        public static void SeedUsers(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager)
        {
            var count = roleManager.Roles.Count();
            if (count == 0)
            {
                var roleName = "Admin";
                var result = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
                var roleName2 = "Client";
                result = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName2
                }).Result;
            }
            if (userManager.FindByEmailAsync("admin@gmail.com").Result == null)
            {
                string email = "admin@gmail.com";
                string roleName = "Admin";
                var user = new DbUser
                {
                    Email = email,
                    UserName = email,
                    PhoneNumber = "+38(666)666-66-66"
                };
                var result = userManager.CreateAsync(user, "Qwerty1-").Result;
                result = userManager.AddToRoleAsync(user, roleName).Result;
             }
            if (userManager.FindByEmailAsync("client@gmail.com").Result == null)
            {
                string email = "client@gmail.com";
                string roleName2 = "Client";
                var user = new DbUser
                {
                    Email = email,
                    UserName = email,
                    PhoneNumber = "+38(999)999-66-66"
                 };
                var result = userManager.CreateAsync(user, "Qwerty1-").Result;
                result = userManager.AddToRoleAsync(user, roleName2).Result;
            }
        }
         
        public static void SeedCategorys(EFDbContext context)
        {
            var list = new List<Category> {
                new Category
                {
                 
                    Name = "Дрова",
                    Image = "drova.jpg"
                },
                new Category
                {
                 
                    Name = "Пелети",
                    Image = "pelet.jpg"
                },
                new Category
                {
                  
                    Name = "Щепа",
                    Image = "shchepa.jpg"
                },
                new Category
                {
                   
                    Name = "Вугілля",
                    Image = "vugilla.jpg"
                },
                new Category
                {
                  
                    Name = "Торф",
                    Image = "torf.jpg"
                },
                new Category
                {
                   
                    Name = "Сланці",
                    Image = "slanci.jpg"
                },
                new Category
                {
                   
                    Name = "Тирса",
                    Image = "tyrsa.jpg"
                },
                new Category
                {
                    
                    Name = "Брикети",
                    Image = "bryket.jpg"
                },
                new Category
                {
                    
                    Name = "Солома",
                    Image = "soloma.jpg"
                }
                };
            using (context)
            {
                foreach (var item in list)
                {

                    if (context.Categories.SingleOrDefault(c=>c.Name==item.Name)==null)
                    {

                        context.Categories.Add(item);
                        context.SaveChanges();
                    }

                }

                

            }
        }
        public static void SeedData(IServiceProvider services, IHostingEnvironment env, IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFDbContext>();
                SeederDB.SeedUsers(manager, managerRole);
                SeederDB.SeedCategorys(context);
               
            }
        }

    }
}
