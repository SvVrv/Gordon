using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.DAL
{
    [Table("tblTorgs")]

    public class Torg
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("ProductOf")]
        public long ProductId { get; set; }
        public virtual Product ProductOf { get; set; }

        [ForeignKey("Seller")]
        public long SellerId { get; set; }
        public virtual DbUser Seller { get; set; }

        public DateTime StartDate { get; set; }
        public int TorgTime { get; set; } //в секундах

        public virtual ICollection<TorgBet> TorgBets { get; set; }
        //public virtual ICollection<UserTorg> UserTorgs { get; set; }







    }
}
