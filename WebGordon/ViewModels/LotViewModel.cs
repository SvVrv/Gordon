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
    public class LotEndViewModel
    {

        public long Id { get; set; }
        public string ProductName { get; set; }
        public int ProductQuantity { get; set; }
        public string Dimensions { get; set; }
        public string ProductDescription { get; set; }
        public string Delivery { get; set; }
        public List<ImageLot> ProductImages { get; set; }
        public decimal LastBet { get; set; }
        public long SellerId { get; set; }
        public string SellerName { get; set; }
        public string SellerImage { get; set; }
        public string SellerPhone { get; set; }
        public string SellerMail { get; set; }
        public long BuyerId { get; set; }
        public string BuyerName { get; set; }
        public string buyerPhone { get; set; }
        public string buyerMail { get; set; }
        public int BetsNumber { get; set; }
        public DateTime FinishDate { get; set; }

    }


    public class ImageProduct
    {
        public long Id { get; set; }
        public string Image { get; set; }
        public bool Main { get; set; }

        public static implicit operator ImageProduct(ImageLot v)
        {
            throw new NotImplementedException();
        }
    }

        public class AddLotViewModel
    {
        public long Id { get; set; }
        public long SellerId { get; set; }
        public string Category { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string Dimensions { get; set; }
        public decimal StartPrice { get; set; }
        public string TorgTime { get; set; }
        public string Description { get; set; }
        public string TorgDelivery { get; set; }
        public List<ImageProduct> Images { get; set; }

         
    }

    public class GetLotViewModel
    {
        public string Category { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string Dimensions { get; set; }
        public decimal StartPrice { get; set; }
        public string Description { get; set; }
        public string TorgDelivery { get; set; }
        public List<ImageProduct> Images { get; set; }


    }
}
