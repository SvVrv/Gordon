using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.DAL
{
    [Table("tblUserTorgs")]
    public class UserTorg
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey("TorgOf")]
        public long TorgId { get; set; }
        public virtual Torg TorgOf { get; set; }

        [ForeignKey("UserOf")]
        public long UserId { get; set; }
        public virtual User UserOf { get; set; }

        public decimal LastBetOfTorg { get; set; }
        public DateTime LastBetDate { get; set; }
        public bool TorgCompleted { get; set; }
        public bool CurrentWin { get; set; }
    }
}
