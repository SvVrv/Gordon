using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebGordon.DAL;
using WebGordon.ViewModels;

namespace WebGordon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LotController : ControllerBase
    {
        private readonly EFDbContext _context;

        public LotController(EFDbContext context)
        {
            _context = context;
        }

        // GET: api/Lot
        [HttpGet]
    
        // GET: api/Lot/5
        [HttpGet("{id}")]
        public IActionResult GetLotViewModel([FromRoute] long id)
        {
            List<LotViewModel> modellist = new List<LotViewModel>();


            Torg torg= _context.Torgs.Include(t => t.ProductOf).Include(t => t.ProductOf.Category).Include(t => t.TorgBets).Include(t => t.ProductOf.Photos).Include(t=>t.Seller)
                .Single(t => t.Id == id);
           
                LotViewModel model = new LotViewModel();
                var status = "active";
                if (torg.FinishDate < DateTime.Now)
                    status = "finished";
                var bet = torg.TorgBets.LastOrDefault(b => b.TorgId == torg.Id);
                var betnum = torg.TorgBets.Count;
                var fotos = torg.ProductOf.Photos.Where(f => f.ProductId == torg.ProductId);
                List <ImageLot> imgs = new List<ImageLot>();
            if (fotos.Count() > 0)
            {
                foreach (var f in fotos)
                {
                    ImageLot img = new ImageLot();
                    img.Id = f.Id;
                    img.Name = f.Path;
                    img.Main = f.Main;
                    imgs.Add(img);
                }
            }
            else
            {
                ImageLot img = new ImageLot();
                img.Id = 0;
                img.Name = torg.ProductOf.Category.Image;
                img.Main = true;
                imgs.Add(img);

            }
         
                model.Id = torg.Id;
                model.ProductName = torg.ProductOf.Name;
                model.ProductQuantity = torg.ProductOf.Quantity;        
                model.TorgStatus = status;
                model.ProductDescription = torg.ProductOf.Description;
                model.LastBet = bet != null ? bet.Bet : torg.ProductOf.StartPrice;
                model.FinishDate = torg.FinishDate;
                model.SellerId =torg.SellerId;
                model.SellerName = torg.Seller.UserName;
                model.SellerImage = torg.Seller.SiteUser.Image;
                model.BetsNumber = betnum;
                model.ProductImages = imgs;
              
               
                modellist.Add(model);
            


            return Ok(modellist);
        }

        
      
    }
}