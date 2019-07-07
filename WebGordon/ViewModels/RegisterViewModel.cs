using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.ViewModels
{
    public class RegisterViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Telnumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        //public string Surname { get; set; }
        //public bool Gender { get; set; }
        //public string Nick { get; set; }
        //public DateTime Birthdate { get; set; }
        //public string Image { get; set; }
        //public string Description { get; set; }       
    }
}
