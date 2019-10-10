using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebGordon.DAL;

namespace WebGordon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TorgBetsController : ControllerBase
    {
        private readonly EFDbContext _context;

        public TorgBetsController(EFDbContext context)
        {
            _context = context;
        }

        // GET: api/TorgBets
        [HttpGet]
        public IEnumerable<TorgBet> GetTorgBets()
        {
            return _context.TorgBets;
        }

        // GET: api/TorgBets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTorgBet([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var torgBet = await _context.TorgBets.FindAsync(id);

            if (torgBet == null)
            {
                return NotFound();
            }

            return Ok(torgBet);
        }

        // PUT: api/TorgBets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTorgBet([FromRoute] long id, [FromBody] TorgBet torgBet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != torgBet.Id)
            {
                return BadRequest();
            }

            _context.Entry(torgBet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TorgBetExists(id))
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

        // POST: api/TorgBets
        [HttpPost]
        public async Task<IActionResult> PostTorgBet([FromBody] TorgBet torgBet)
        {
            torgBet.StartDate = DateTime.Now;
            var last = _context.TorgBets.LastOrDefault(b => b.TorgId == torgBet.TorgId);
            var bet = last == null ? 0 : last.Bet;
            if (torgBet.Bet <= bet)
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TorgBets.Add(torgBet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTorgBet", new { id = torgBet.Id }, torgBet);
        }

        // DELETE: api/TorgBets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTorgBet([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var torgBet = await _context.TorgBets.FindAsync(id);
            if (torgBet == null)
            {
                return NotFound();
            }

            _context.TorgBets.Remove(torgBet);
            await _context.SaveChangesAsync();

            return Ok(torgBet);
        }

        private bool TorgBetExists(long id)
        {
            return _context.TorgBets.Any(e => e.Id == id);
        }
    }
}