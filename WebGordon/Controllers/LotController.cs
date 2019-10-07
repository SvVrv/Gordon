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


            Torg torg= _context.Torgs.Include(t => t.ProductOf).Include(t => t.ProductOf.Category).Include(t => t.TorgBets).Include(t => t.ProductOf.Photos).Include(t=>t.Seller)
               .Include(t=>t.Seller.SiteUser).Single(t => t.Id == id);
           
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
                    img.ImgId = f.Id;
                    img.Name = f.Path;
                    img.Main = f.Main;
                    imgs.Add(img);
                }
            }
            else
            {
                ImageLot img = new ImageLot();
                img.ImgId = 0;
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
                model.SellerImage = torg.Seller.SiteUser.Image ?? null;
                model.BetsNumber = betnum;
                model.ProductImages = imgs;
              
               
                
            


        // PUT: api/Lot/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLotViewModel([FromRoute] long id, [FromBody] LotViewModel lotViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lotViewModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(lotViewModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LotViewModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Lot
        [HttpPost]
        public async Task<IActionResult> PostLotViewModel([FromBody] LotViewModel lotViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.LotViewModel.Add(lotViewModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLotViewModel", new { id = lotViewModel.Id }, lotViewModel);
        }

        // DELETE: api/Lot/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLotViewModel([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var lotViewModel = await _context.LotViewModel.FindAsync(id);
            if (lotViewModel == null)
            {
                return NotFound();
            }

            _context.LotViewModel.Remove(lotViewModel);
            await _context.SaveChangesAsync();

            return Ok(lotViewModel);
        }

        private bool LotViewModelExists(long id)
        {
            return _context.LotViewModel.Any(e => e.Id == id);
        }
    }
}