using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebGordon.DAL;
using WebGordon.Utils;
using WebGordon.ViewModels;

namespace WebGordon.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class LotController : ControllerBase
    {
        private readonly EFDbContext _context;
        private readonly IHostingEnvironment _env;
        public LotController(EFDbContext context, IHostingEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Lot
        [HttpGet]

        // GET: api/Lot/5
        [HttpGet("{id}")]
        public IActionResult GetLotViewModel([FromRoute] long id)
        {


            Torg torg = _context.Torgs.Include(t => t.ProductOf).Include(t => t.ProductOf.Category).Include(t => t.TorgBets).Include(t => t.ProductOf.Photos).Include(t => t.Seller)
               .Include(t => t.Seller.SiteUser).Single(t => t.Id == id);

            LotViewModel model = new LotViewModel();
            var status = "active";
            if (torg.FinishDate < DateTime.Now)
                status = "finished";
            var bet = torg.TorgBets.LastOrDefault(b => b.TorgId == torg.Id);
            var betnum = torg.TorgBets.Count;
            var fotos = torg.ProductOf.Photos.Where(f => f.ProductId == torg.ProductId);
            List<ImageLot> imgs = new List<ImageLot>();
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
            model.Dimensions = torg.ProductOf.Dimensions;
            model.TorgStatus = status;
            model.ProductDescription = torg.ProductOf.Description;
            model.Delivery = torg.ProductOf.Delivery;
            model.LastBet = bet != null ? bet.Bet : torg.ProductOf.StartPrice;
            model.FinishDate = torg.FinishDate;
            model.SellerId = torg.SellerId;
            model.SellerName = torg.Seller.UserName;
            model.SellerImage = torg.Seller.SiteUser.Image ?? null;
            model.BetsNumber = betnum;
            model.ProductImages = imgs;

            return Ok(model);
        }
                

        // POST: api/Lot/add
        [HttpPost("add")]
        public async Task<IActionResult> AddLot([FromBody] AddLotViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
                int hours = 0;
                if (model.TorgTime == "3 дні") hours = 72;
                if (model.TorgTime == "1 тиждень") hours = 168;
                if (model.TorgTime == "2 тижні") hours = 336;
                if (model.TorgTime == "3 тижні") hours = 24*21;


            if (model.Id == 0)
            {
                var product = new Product
                {
                    CategoryId = _context.Categories.First(c => c.Name == model.Category).Id,
                    Name = model.ProductName,
                    Quantity = model.Quantity,
                    Dimensions = model.Dimensions,
                    StartPrice = model.StartPrice,
                    Description = model.Description,
                    Delivery = model.TorgDelivery,
                    DateCreate = DateTime.Now,
                    //Photos=productPhotos
                };
                _context.Add(product);
                _context.SaveChanges();

                var productPhotos = new List<ProductPhoto>();
                foreach (var item in model.Images)
                {
                    var productPhoto = new ProductPhoto
                    {
                        Main = item.Main,
                        Path =  (item.Image == "") ? null : new FileService(_env).UploadProductImage(item.Image),
                        ProductId = product.Id
                    };
                    _context.Photos.Add(productPhoto);
                }
                var torg = new Torg
                {
                    ProductId = product.Id,
                    SellerId = model.SellerId,
                    StartDate = new DateTime(),
                    FinishDate = new DateTime().AddHours(hours)
                };
                _context.Add(torg);
            await _context.SaveChangesAsync();
            return Ok(new { id = torg.Id });
            }
            else
            {                
                var torg = _context.Torgs.Single(t => t.Id == model.Id);
                torg.SellerId = model.SellerId;
                torg.FinishDate = new DateTime().AddHours(hours);
                _context.Update(torg);

                var product = _context.Products.Include(p => p.Torgs).FirstOrDefault(p => p.Id == torg.ProductId);
                product.CategoryId = _context.Categories.First(c => c.Name == model.Category).Id;
                product.Name = model.ProductName;
                product.Quantity = model.Quantity;
                product.Dimensions = model.Dimensions;
                product.StartPrice = model.StartPrice;
                product.Description = model.Description;
                product.Delivery = model.TorgDelivery;
                _context.Update(product);

                _context.SaveChanges();

                var oldProductPhotos = _context.Photos.Where(f => f.ProductId == product.Id).ToList();


                //var newProductPhotos = new List<ProductPhoto>();
                bool coincid = false;
                foreach (var itemOld in oldProductPhotos)
                {
                    foreach (var itemNew in model.Images)
                    {
                        if (itemNew.Image.Contains(".jpg"))
                        {
                            if (itemOld.Path.EndsWith(itemNew.Image))
                                coincid = true;
                        }
                    }
                    if (coincid == false)
                        _context.Remove(itemOld);
                }

                foreach (var itemNew in model.Images)
                {
                    if (!itemNew.Image.Contains(".jpg"))
                    {
                        var productPhoto = new ProductPhoto
                        {
                            Main = itemNew.Main,
                            Path = (itemNew.Image == "") ? null : new FileService(_env).UploadProductImage(itemNew.Image),
                            ProductId = product.Id
                        };
                        _context.Photos.Add(productPhoto);
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new { id = torg.Id });
            }
            //return CreatedAtAction("GetLotViewModel", new { id = product.Id }, model);
        }


        // POST: api/Lot/start
        [HttpPost("start")]
        public async Task<IActionResult> StartLot([FromBody] AddLotViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            int hours = 0;
            if (model.TorgTime == "3 дні") hours = 72;
            if (model.TorgTime == "1 тиждень") hours = 168;
            if (model.TorgTime == "2 тижні") hours = 336;
            if (model.TorgTime == "3 тижні") hours = 24 * 21;

            if (model.Id == 0)
            {
                var product = new Product
                {
                    CategoryId = _context.Categories.First(c => c.Name == model.Category).Id,
                    Name = model.ProductName,
                    Quantity = model.Quantity,
                    Dimensions = model.Dimensions,
                    StartPrice = model.StartPrice,
                    Description = model.Description,
                    Delivery = model.TorgDelivery,
                    DateCreate = DateTime.Now,
                };
                _context.Add(product);
                _context.SaveChanges();

                var productPhotos = new List<ProductPhoto>();
                foreach (var item in model.Images)
                {
                    var productPhoto = new ProductPhoto
                    {
                        Main = item.Main,
                        Path = (item.Image == "") ? null : new FileService(_env).UploadProductImage(item.Image),
                        ProductId = product.Id
                    };
                    _context.Photos.Add(productPhoto);
                }
                var torg = new Torg
                {
                    ProductId = product.Id,
                    SellerId = model.SellerId,
                    StartDate = DateTime.Now,
                    FinishDate = DateTime.Now.AddHours(hours)
                };
                _context.Add(torg);
                await _context.SaveChangesAsync();
                return Ok(new { id = torg.Id });
            }
            else
            {
                var torg = _context.Torgs.Single(t => t.Id == model.Id);
                torg.SellerId = model.SellerId;
                torg.StartDate = DateTime.Now;
                torg.FinishDate = DateTime.Now.AddHours(hours);
                _context.Update(torg);

                var product = _context.Products.Include(p => p.Torgs).FirstOrDefault(p => p.Id == torg.ProductId);
                product.CategoryId = _context.Categories.First(c => c.Name == model.Category).Id;
                product.Name = model.ProductName;
                product.Quantity = model.Quantity;
                product.Dimensions = model.Dimensions;
                product.StartPrice = model.StartPrice;
                product.Description = model.Description;
                product.Delivery = model.TorgDelivery;
                _context.Update(product);
                _context.SaveChanges();

                var oldProductPhotos = _context.Photos.Where(f => f.ProductId == product.Id).ToList();

                bool coincid = false;
                foreach (var itemOld in oldProductPhotos)
                {
                    foreach (var itemNew in model.Images)
                    {
                        if (itemNew.Image.Contains(".jpg"))
                        {
                            if (itemOld.Path.EndsWith(itemNew.Image))
                                coincid = true;
                        }
                    }
                    if (coincid == false)
                        _context.Remove(itemOld);
                }

                foreach (var itemNew in model.Images)
                {
                    if (!itemNew.Image.Contains(".jpg"))
                    {
                        var productPhoto = new ProductPhoto
                        {
                            Main = itemNew.Main,
                            Path = (itemNew.Image == "") ? null : new FileService(_env).UploadProductImage(itemNew.Image),
                            ProductId = product.Id
                        };
                        _context.Photos.Add(productPhoto);
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new { id = torg.Id });
            }
            //return CreatedAtAction("GetLotViewModel", new { id = product.Id }, model);
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


        // PUT: api/Lot/5
       
    }
}