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

        //// GET: api/Lot
        //[HttpGet]
        //public IEnumerable<LotViewModel> GetLotViewModel()
        //{
        //    return _context.LotViewModel;
        //}

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

        // POST: api/Lot/add
        [HttpPost("add")]
        public async Task<IActionResult> AddLot([FromBody] AddLotViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var product = new Product
                {
                CategoryId = _context.Categories.First(c => c.Name == model.Category).Id,
                Name = model.ProductName,
                Quantity = model.Quantity,
                Dimensions = model.Dimensions,
                StartPrice = model.StartPrice,
                Description = model.Description,
                Delivery=model.TorgDelivery,
                DateCreate=DateTime.Now

            };
            product.Category.Name = model.ProductName;



            _context.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLotViewModel", new { id = model.Id }, model);
        }


        //// PUT: api/Lot/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutLotViewModel([FromRoute] long id, [FromBody] LotViewModel lotViewModel)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != lotViewModel.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(lotViewModel).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!LotViewModelExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}


        //// DELETE: api/Lot/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteLotViewModel([FromRoute] long id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var lotViewModel = await _context.LotViewModel.FindAsync(id);
        //    if (lotViewModel == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.LotViewModel.Remove(lotViewModel);
        //    await _context.SaveChangesAsync();

        //    return Ok(lotViewModel);
        //}

        //private bool LotViewModelExists(long id)
        //{
        //    return _context.LotViewModel.Any(e => e.Id == id);
        //}
    }
}