using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.DAL
{
    [Table("tblProducts")]

    public class Product
    {
        [Key]
        public long Id { get; set; }
        [ForeignKey("Category")]
        public long CategoryId { get; set; }
        [Required, StringLength(maximumLength: 250)]
        public string Name { get; set; }
        public decimal StartPrice { get; set; }
        public int Quantity { get; set; }
        public string Dimensions { get; set; }
        public DateTime DateCreate { get; set; }
        public string Description { get; set; }
        public string Delivery { get; set; }
        public virtual Category Category { get; set; }
        public virtual ICollection<ProductPhoto> Photos { get; set; }
        public virtual ICollection<Torg> Torgs { get; set; }
        //public virtual ICollection<Filter> Filters { get; set; }
    }
}
