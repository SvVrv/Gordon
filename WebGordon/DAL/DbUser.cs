using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.DAL
{
    public class DbUser : IdentityUser<long>
    {
        public ICollection<DbUserRole> UserRoles { get; set; }

        public virtual User SiteUser { get; set; }
        public virtual ICollection<TorgBet> TorgBets { get; set; }
        public virtual ICollection<Torg> Torgs { get; set; }
    }
}
