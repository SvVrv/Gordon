﻿using System;
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
                ProductPhoto mainfoto = new ProductPhoto();
                if (fotos.Count() > 0)
                    mainfoto = fotos.FirstOrDefault(f => f.Main == true);
                else mainfoto = null;
                model.Id = t.Id;
                    model.ProductName = t.ProductOf.Name;
                    model.ProductQuantity = t.ProductOf.Quantity;
                    model.Dimensions = t.ProductOf.Dimensions;

                model.ProductImage = mainfoto != null ? mainfoto.Path : t.ProductOf.Category.Image;

                model.TorgStatus = "активні";
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
                var status = "непочаті";
                if (t.StartDate == new DateTime())
                {
                  status= "непочаті";
                }
                else if (t.StartDate <= DateTime.Now && t.FinishDate >= DateTime.Now)
                     status = "активні";
                else if (t.FinishDate < DateTime.Now)
                    status = "завершені";
                var bet = t.TorgBets.LastOrDefault(b => b.TorgId == t.Id);
                var fotos = t.ProductOf.Photos.Where(f => f.ProductId == t.ProductId);
               ProductPhoto  mainfoto = new ProductPhoto();
                if (fotos.Count() > 0)
                    mainfoto = fotos.FirstOrDefault(f => f.Main == true);
                else mainfoto = null;
                model.Id = t.Id;
                model.ProductName = t.ProductOf.Name;
                model.ProductQuantity = t.ProductOf.Quantity;
                model.Dimensions = t.ProductOf.Dimensions;
                model.ProductImage = mainfoto!=null?mainfoto.Path: t.ProductOf.Category.Image;
                model.TorgStatus = status;
                model.ProductDescription = t.ProductOf.Description;
                model.LastBet = bet != null ? bet.Bet : t.ProductOf.StartPrice;
                model.FinishDate = t.FinishDate;
                model.Seller = true;


                modellist.Add(model);
            }
            List<TorgBet> torg1 = _context.TorgBets.Include(t=>t.TorgOf).Include(t=>t.TorgOf.ProductOf).Include(t=>t.TorgOf.ProductOf.Photos).Include(t => t.TorgOf.ProductOf.Category).Where(t => t.ClientId == id).GroupBy(t => t.TorgId)
             .Select(t => t.OrderByDescending(b => b.Bet).FirstOrDefault()).ToList();



            foreach (var t in torg1)
            {
                TorgViewModel model = new TorgViewModel();
                var status = "непочаті";
                if (t.StartDate == new DateTime())
                {

                    status = "непочаті";
                }
                if (t.TorgOf.StartDate <= DateTime.Now && t.TorgOf.FinishDate >= DateTime.Now)
                    status = "активні";
                if (t.TorgOf.FinishDate < DateTime.Now)
                    status = "завершені";
                
                var fotos = t.TorgOf.ProductOf.Photos.Where(f => f.ProductId == t.TorgOf.ProductId);
                ProductPhoto mainfoto = new ProductPhoto();
                if (fotos.Count() > 0)
                     mainfoto = fotos.FirstOrDefault(f => f.Main == true);
                else mainfoto = null;
                model.Id = t.TorgOf.Id;
                model.ProductName = t.TorgOf.ProductOf.Name;
                model.ProductQuantity = t.TorgOf.ProductOf.Quantity;
                model.Dimensions = t.TorgOf.ProductOf.Dimensions;
                model.ProductImage = mainfoto != null ? mainfoto.Path : t.TorgOf.ProductOf.Category.Image;
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
     
    }
}