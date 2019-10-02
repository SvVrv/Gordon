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
    public class TorgController : ControllerBase
    {
        private readonly EFDbContext _context;

        public TorgController(EFDbContext context)
        {
            _context = context;
        }

        // GET: api/Torg
        [HttpGet]
        public IEnumerable<TorgViewModel> GetTorgViewModel()
        {
            return _context.TorgViewModel;
        }

        // GET: api/Torg/5
        [HttpGet("{cat}/{name}")]
        public IActionResult GetTorgViewModel([FromRoute] string cat, [FromRoute] string name)
        {

            List<TorgViewModel> modellist=new List<TorgViewModel>();
            
             
                List<Torg> torgs = _context.Torgs.Include(t=>t.ProductOf).Include(t=>t.ProductOf.Category).Include(t=>t.TorgBets).Include(t=>t.ProductOf.Photos).Where(t => t.ProductOf.Category.Name == name)
                    .Where(t=>t.StartDate<DateTime.Now&&t.FinishDate>DateTime.Now).ToList();
                foreach(var t in torgs)
                {
                    TorgViewModel model = new TorgViewModel();

                    var bet = t.TorgBets.LastOrDefault(b => b.TorgId == t.Id);
                    var fotos = t.ProductOf.Photos.Where(f => f.ProductId == t.ProductId);
                string mainfoto=null;
                if (fotos.Count() > 0)
                    mainfoto = fotos.FirstOrDefault(f => f.Main == true).Path;
                    model.Id = t.Id;
                    model.ProductName = t.ProductOf.Name;
                    model.ProductQuantity = t.ProductOf.Quantity;
                    model.ProductImage = mainfoto ?? t.ProductOf.Category.Image;
                    model.TorgStatus = "active";
                    model.ProductDescription = t.ProductOf.Description;
                    model.LastBet = bet != null ? bet.Bet : t.ProductOf.StartPrice;
                    model.FinishDate = t.FinishDate;
                    model.Seller = false;
                

                    modellist.Add(model);

                

              
                }

            return Ok(modellist);
        }
        [HttpGet("{id}")]
        public IActionResult GetTorgViewModeluser([FromRoute] long id)
        {

            List<TorgViewModel> modellist = new List<TorgViewModel>();


            List<Torg> torgs = _context.Torgs.Include(t => t.ProductOf).Include(t => t.ProductOf.Category).Include(t => t.TorgBets).Include(t => t.ProductOf.Photos)
                .Where(t => t.SellerId==id).ToList();
            foreach (var t in torgs)
            {
                TorgViewModel model = new TorgViewModel();
                var status = "notactive";
                if (t.StartDate <= DateTime.Now && t.FinishDate >= DateTime.Now)
                    status = "active";
                if (t.FinishDate < DateTime.Now)
                    status = "finished";
                var bet = t.TorgBets.LastOrDefault(b => b.TorgId == t.Id);
                var fotos = t.ProductOf.Photos.Where(f => f.ProductId == t.ProductId);
                string mainfoto = null;
                if (fotos.Count() > 0)
                     mainfoto = fotos.FirstOrDefault(f => f.Main == true).Path;
                model.Id = t.Id;
                model.ProductName = t.ProductOf.Name;
                model.ProductQuantity = t.ProductOf.Quantity;
                model.ProductImage = mainfoto ?? t.ProductOf.Category.Image;
                model.TorgStatus = status;
                model.ProductDescription = t.ProductOf.Description;
                model.LastBet = bet != null ? bet.Bet : t.ProductOf.StartPrice;
                model.FinishDate = t.FinishDate;
                model.Seller = true;


                modellist.Add(model);
            }
            List<TorgBet> torg1 = _context.TorgBets.Include(t=>t.TorgOf).Include(t=>t.TorgOf.ProductOf).Include(t=>t.TorgOf.ProductOf.Photos).Where(t => t.ClientId == id).GroupBy(t => t.TorgId)
             .Select(t => t.OrderByDescending(b => b.Bet).FirstOrDefault()).ToList();



            foreach (var t in torg1)
            {
                TorgViewModel model = new TorgViewModel();
                var status = "notactive";
                if (t.TorgOf.StartDate <= DateTime.Now && t.TorgOf.FinishDate >= DateTime.Now)
                    status = "active";
                if (t.TorgOf.FinishDate < DateTime.Now)
                    status = "finished";
                
                var fotos = t.TorgOf.ProductOf.Photos.Where(f => f.ProductId == t.TorgOf.ProductId);
                string mainfoto = null;
                if (fotos.Count() > 0)
                     mainfoto = fotos.FirstOrDefault(f => f.Main == true).Path;
                model.Id = t.TorgOf.Id;
                model.ProductName = t.TorgOf.ProductOf.Name;
                model.ProductQuantity = t.TorgOf.ProductOf.Quantity;
                model.ProductImage = mainfoto ?? t.TorgOf.ProductOf.Category.Image;
                model.TorgStatus = status;
                model.ProductDescription = t.TorgOf.ProductOf.Description;
                model.LastBet =t.Bet;
                model.FinishDate = t.TorgOf.FinishDate;
                model.Seller = false;


                modellist.Add(model);
            }

            return Ok(modellist);
        }

        // PUT: api/Torg/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTorgViewModel([FromRoute] long id, [FromBody] TorgViewModel torgViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != torgViewModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(torgViewModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TorgViewModelExists(id))
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

        // POST: api/Torg
        [HttpPost]
        public async Task<IActionResult> PostTorgViewModel([FromBody] TorgViewModel torgViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TorgViewModel.Add(torgViewModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTorgViewModel", new { id = torgViewModel.Id }, torgViewModel);
        }

        // DELETE: api/Torg/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTorgViewModel([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var torgViewModel = await _context.TorgViewModel.FindAsync(id);
            if (torgViewModel == null)
            {
                return NotFound();
            }

            _context.TorgViewModel.Remove(torgViewModel);
            await _context.SaveChangesAsync();

            return Ok(torgViewModel);
        }

        private bool TorgViewModelExists(long id)
        {
            return _context.TorgViewModel.Any(e => e.Id == id);
        }
    }
}