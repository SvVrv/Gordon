using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.ViewModels
{
    public class ImageLot
    {
        public long ImgId { get; set; }
        public string Name { get; set; }
        public bool Main { get; set; }
    }
    public class LotViewModel
    {
        
            public long Id { get; set; }
            public string ProductName { get; set; }
            public int ProductQuantity { get; set; }
            public string Dimensions { get; set; }
            public string ProductDescription { get; set; }
            public string TorgStatus { get; set; }
            public string Delivery { get; set; }
            public List<ImageLot> ProductImages { get; set; }
            public decimal LastBet { get; set; }
            public long SellerId { get; set; }
            public string SellerName { get; set; }
            public string SellerImage { get; set; }
            public int BetsNumber { get; set; }
            public DateTime FinishDate { get; set; }
        
    }
}
