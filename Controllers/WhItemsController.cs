#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WarehouseAspReact.Models;

namespace WarehouseAspReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WhItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public WhItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/WhItems
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<WhItem>>> GetWhItems()
        {
            return await _context.WhItems
                .Select(x => new WhItem()
                {
                    Id = x.Id,
                    Title = x.Title,
                    ImageName = x.ImageName,
                    SerialNumber = x.SerialNumber,
                    TimeCreated = x.TimeCreated,
                    TimeUpdated = x.TimeUpdated,
                    ImageSrc = String.Format("{0}://{1}{2}/Images/{3}",Request.Scheme,Request.Host,Request.PathBase,x.ImageName)
                })
                .ToListAsync();
        }

        // GET: api/WhItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WhItem>> GetWhItem(int id)
        {
            var whItem = await _context.WhItems.FindAsync(id);

            if (whItem == null)
            {
                return NotFound();
            }

            return whItem;
        }

        // PUT: api/WhItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWhItem(int id, WhItem whItem)
        {
            if (id != whItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(whItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WhItemExists(id))
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

        // POST: api/WhItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WhItem>> PostWhItem(WhItem whItem)
        {
            _context.WhItems.Add(whItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWhItem", new { id = whItem.Id }, whItem);
        }

        // DELETE: api/WhItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWhItem(int id)
        {
            var whItem = await _context.WhItems.FindAsync(id);
            if (whItem == null)
            {
                return NotFound();
            }

            _context.WhItems.Remove(whItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WhItemExists(int id)
        {
            return _context.WhItems.Any(e => e.Id == id);
        }
    }
}
