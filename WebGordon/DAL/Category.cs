using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.DAL
{
    [Table("tblCategories")]
    public class Category
    {




        [Key, Column(Order = 0)]

        public long Id { get; set; }
        [ForeignKey("Parent"), Column(Order = 1)]
        public long? ParentId { get; set; }
        [Required, StringLength(maximumLength: 255)]
        public string Name { get; set; }

        public string Image { get; set; }

        public Category Parent { get; set; }
        public virtual ICollection<Product> Products { get; set; }


    }
}