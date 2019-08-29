using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.DAL
{
    [Table("tblClients")]
    public class User
    {
        [Key, ForeignKey("DbUser")]
        public long Id { get; set; }
        [StringLength(maximumLength: 100)]
        public string Nick { get; set; }
        [StringLength(maximumLength: 1000)]
        public string Description { get; set; }
        [StringLength(maximumLength: 128)]
        public string Image { get; set; }
        
        public virtual DbUser DbUser { get; set; }

        //public virtual ICollection<UserTorg> UserTorgs { get; set; }
        //public virtual ICollection<TorgBet> TorgBets { get; set; }
        //public virtual ICollection<Torg> Torgs { get; set; }
    }
}
