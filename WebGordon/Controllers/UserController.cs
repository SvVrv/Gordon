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
using WebGordon.Utils;
using Microsoft.AspNetCore.Hosting;

namespace WebGordon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IHostingEnvironment _env;
        private readonly EFDbContext _context;
        public UserController(EFDbContext context, IHostingEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [Authorize]
        [HttpGet("[action]")]
        public IActionResult Profile()
        {
            var userId = long.Parse( User.FindFirstValue("id"));
            var user = _context.SiteUsers.Include(u=>u.DbUser.UserRoles).FirstOrDefault(u => u.Id == userId);
            UserViewModel model = new UserViewModel();

            //if (user.DbUser.UserRoles.SingleOrDefault(r => r.Role.Name == "Admin") != null)
            //{
            //    model.Type = "Admin";
            //}
            //else model.Type = "client";
            //var useradmin = user.DbUser.UserRoles.SingleOrDefault(r => r.Role.Name == "Admin");
            model.Id = user.Id.ToString();
            model.Email = user.DbUser.Email;
            model.Name = user.Nick;
            model.Description = user.Description;
            if (user.Image != null)
                model.Image = new FileService(_env).GetUserImage(user.Image);
            else model.Image = null;
            model.Phone = user.DbUser.PhoneNumber;
                model.Type = "Admin";
            return Ok(model);
        }



    }
}