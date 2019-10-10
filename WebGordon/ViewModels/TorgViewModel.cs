using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.ViewModels
{
    public class TorgViewModel
    {
        public long Id { get; set; }
        public string ProductName { get; set; }
        public int ProductQuantity { get; set; }
        public string Dimensions { get; set; }
        public string ProductDescription { get; set; }
        public string TorgStatus { get; set; }
        public string ProductImage { get; set; }
        public decimal LastBet { get; set; }
        public bool Seller { get; set; }
        public DateTime FinishDate { get; set; }
    }
}
