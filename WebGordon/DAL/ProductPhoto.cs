using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.DAL
{
    [Table("tblPhotos")]
    public class ProductPhoto
    {
        [Key]
        public long Id { get; set; }
        [ForeignKey("Product")]
        public long ProductId { get; set; }
        public virtual Product Product { get; set; }
        public bool Main { get; set; }
        public string Path { get; set; }
    }
}
