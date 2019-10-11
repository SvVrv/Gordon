using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebGordon.DAL;
using WebGordon.Utils;
using WebGordon.ViewModels;

namespace WebGordon.Controllers
{
    public class Credentials
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : ControllerBase
    {
        private readonly IHostingEnvironment _env;
        readonly UserManager<DbUser> _userManager;
        readonly SignInManager<DbUser> _signInManager;
        readonly EFDbContext _context;
        public AccountController(UserManager<DbUser> userManager,
            EFDbContext context,
            SignInManager<DbUser> signInManager,
            IHostingEnvironment env)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _env = env;
            _context = context;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            string tempImage = (model.Image == "") ? null : new FileService(_env).UploadUserImage(model.Image);
            var client = new User
            {
                Nick = model.Name,
                Description = model.Description,
                Image = tempImage
            };
            var user = new DbUser
            {
                UserName = model.Email,
                Email = model.Email,
                PhoneNumber = model.Telnumber,
                SiteUser = client,
            };
             var result = await _userManager
                .CreateAsync(user, model.Password);
            if (!result.Succeeded)
                //return BadRequest(result.Errors);
                return BadRequest(new { invalid = "Не коректно вкзано дані", result.Errors });

            var roleName = "Client";
            result = _userManager.AddToRoleAsync(user, roleName).Result;
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(CreateToken(user));
        }

        [HttpPost("changeaccount")]
        public async Task<IActionResult> ChangeAccount([FromBody]ChangeAccountViewModel model)
        {
            var user = await _userManager.FindByIdAsync(model.Id.ToString());
            if (model.Changed== "Email")
            {
                user.UserName = model.Email;
                user.Email = model.Email;
                var res = _userManager.UpdateAsync(user).Result;
            if (!res.Succeeded)
                return BadRequest(new { invalid = "Помилка редагування Email", res.Errors });
            }

            if (model.Changed == "Name")
            {
                var userC=_context.SiteUsers.SingleOrDefault(u => u.Id == user.Id);
                if(userC==null)
                    return BadRequest(new { invalid = "Помилка редагування імені" });
                userC.Nick = model.Name;
                _context.SaveChanges();
            }

            if (model.Changed == "Description")
            {
                var userC = _context.SiteUsers.SingleOrDefault(u => u.Id == user.Id);
                if (userC == null)
                    return BadRequest(new { invalid = "Помилка редагування опису" });
                userC.Description = model.Description;
                _context.SaveChanges();
            }

            if (model.Changed == "Phone")
            {
                user.PhoneNumber = model.Telnumber;
                var res = _userManager.UpdateAsync(user).Result;
                if (!res.Succeeded)
                    return BadRequest(new { invalid = "Помилка редагування телефону", res.Errors });
            }

            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(CreateToken(user));
        }

        [HttpPost("changeUserImage")]
        public async Task<IActionResult> ChangeUserImage([FromBody]ChangeUserImageViewModel model)
        {
            DbUser user = new DbUser();
            if (model != null)
            {
                user = await _userManager.FindByIdAsync(model.Id.ToString());
                string tempImage = (model.Image == "") ? null : new FileService(_env).UploadUserImage(model.Image);
                var userC = _context.SiteUsers.SingleOrDefault(u => u.Id == model.Id);
                if (userC == null)
                    return BadRequest(new { invalid = "Помилка зміни зображення" });
                userC.Image = tempImage;
                try
                {
                    _context.SaveChanges();
                }
                catch
                {
                    return BadRequest(new { invalid = "Помилка запису в базу даних" });
                }
            }
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(CreateToken(user));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]Credentials credentials)
        {
            var result = await _signInManager
                .PasswordSignInAsync(credentials.Email, credentials.Password,
                false, false);
            if (!result.Succeeded)
                return BadRequest(new { invalid = "Не коректно вкзано дані" });
            var user = await _userManager.FindByEmailAsync(credentials.Email);
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(CreateToken(user));
        }

        string CreateToken(DbUser user)
        {
            var claims = new Claim[]
            {
                //new Claim(JwtRegisteredClaimNames.Sub, user.Id)
                new Claim("id", user.Id.ToString()),
                new Claim("name", user.UserName)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public string CreateToken2(DbUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            var claims = new List<Claim>()
            {
                new Claim("id", user.Id.ToString()),
                new Claim("name", user.UserName)
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SecretPhrase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}