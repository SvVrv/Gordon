using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebGordon.DAL;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;
using WebGordon.ViewModels;

namespace WebGordon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly EFDbContext _context;
        public UserController(EFDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("[action]")]
        public IActionResult Profile()
        {
            var userId = long.Parse( User.FindFirstValue("id"));
            var user = _context.Users.Include(u=>u.UserRoles).FirstOrDefault(u => u.Id == userId);
            UserViewModel model = new UserViewModel();

            //if(user.UserRoles.SingleOrDefault(r=>r.Role.Name=="Admin")!=null)
            //    {
            //      сектор для функціоналу адміна
            //    }


            {
                //if (user.User != null)
                //{
                //    model = new UserClientViewModel
                //    {
                //        ClientDescription = user.Client.Description,
                //        ClientDiscount = user.Client.Discount,
                //        ClientImage = user.Client.Image,
                //        ClientNick = user.Client.Nick
                //    };
                //}
                //else if (user.Waiters != null)
                //{
                //    model = new UserWaiterViewModel
                //    {
                //        WaiterDescription = user.Waiters.Description,
                //        WaiterNick = user.Waiters.Nick,
                //        WaiterExperience = user.Waiters.Experience,
                //        WaiterImage = user.Waiters.Image,
                //        WaiterPayment = user.Waiters.Payment
                //    };
                //}
                //else if (user.Cookers != null)
                //{
                //    model = new UserCookerViewModel
                //    {
                //        CookerExperience = user.Cookers.Experience,
                //        CookerImage = user.Cookers.Image,
                //        CookerPayment = user.Cookers.Payment,
                //        CookerQualification = user.Cookers.Qualification,
                //        CookerSpecialization = user.Cookers.Specialization
                //    };
                //}
                //else if (user.Manager != null)
                //{
                //    model = new UserManagerViewModel
                //    {
                //        ManagerExperience = user.Manager.Experience,
                //        ManagerImage = user.Manager.Image,
                //        ManagerQuantityTeam = user.Manager.QuantityTeam
                //    };
                //}
                //else if (user.Chief != null)
                //{
                //    model = new UserChiefViewModel
                //    {
                //        ChiefImage = user.Chief.Image
                //    };
                //}
            }


            var useradmin = user.UserRoles.SingleOrDefault(r => r.Role.Name == "Admin");
            // (user.UserRoles.SingleOrDefault(r => r.Role.Name == "Admin") != null)
            {
                
            }
            model.Id = user.Id.ToString();
            model.Email = user.Email;
            model.Name = user.User.Nick;
            model.Description = user.User.Description;
            model.Image = user.User.Image;
            model.Phone = user.PhoneNumber;

            return Ok(model);
        }



    }
}