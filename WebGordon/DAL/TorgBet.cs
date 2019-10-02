using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.DAL
{
    [Table("tblTorgBets")]
    public class TorgBet
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("TorgOf")]
        public long TorgId { get; set; }
        public virtual Torg TorgOf { get; set; }

        [ForeignKey("ClientOf")]
        public long ClientId { get; set; }
        public virtual DbUser ClientOf { get; set; }

        public decimal Bet { get; set; } //ставка
        public DateTime StartDate { get; set; }
    }
}
