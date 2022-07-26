using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using footsapp_server.mvc.Data;
using footsapp_server.mvc.Models;

namespace footsapp_server.mvc.Controllers
{
    public class RatingsController : Controller
    {
        private readonly footsapp_servermvcContext _context;

        public RatingsController(footsapp_servermvcContext context)
        {
            _context = context;
        }

        // GET: Ratings
        public async Task<IActionResult> Index()
        {
              return _context.Ranking != null ? 
                          View(await _context.Ranking.ToListAsync()) :
                          Problem("Entity set 'footsapp_servermvcContext.Ranking'  is null.");
        }

        [HttpPost]
        public async Task<IActionResult> Index(string query)
        {
            if (!string.IsNullOrEmpty(query))
            {
                var q = _context.Ranking.Where(rate => rate.RateDescription.Contains(query));
                return View(await q.ToListAsync());
            }
            return _context.Ranking != null ?
                          View(await _context.Ranking.ToListAsync()) :
                          Problem("Entity set 'footsapp_servermvcContext.Ranking'  is null.");
        }

        // GET: Ratings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Ranking == null)
            {
                return NotFound();
            }

            var rating = await _context.Ranking
                .FirstOrDefaultAsync(m => m.Id == id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }

        // GET: Ratings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Ratings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Rate,Name,RateDescription")] Rating rating)
        {
            rating.Time = DateTime.Now.ToString("HH:mm:ss, dd-MM-yyyy");
            if (ModelState.IsValid)
            {
                _context.Add(rating);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(rating);
        }

        // GET: Ratings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Ranking == null)
            {
                return NotFound();
            }

            var rating = await _context.Ranking.FindAsync(id);
            if (rating == null)
            {
                return NotFound();
            }
            return View(rating);
        }

        // POST: Ratings/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Rate,Name,RateDescription")] Rating rating)
        {
            if (id != rating.Id)
            {
                return NotFound();
            }

            rating.Time = DateTime.Now.ToString("HH:mm:ss, dd-MM-yyyy");
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(rating);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RatingExists(rating.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(rating);
        }

        // GET: Ratings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Ranking == null)
            {
                return NotFound();
            }

            var rating = await _context.Ranking
                .FirstOrDefaultAsync(m => m.Id == id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }

        // POST: Ratings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Ranking == null)
            {
                return Problem("Entity set 'footsapp_servermvcContext.Ranking'  is null.");
            }
            var rating = await _context.Ranking.FindAsync(id);
            if (rating != null)
            {
                _context.Ranking.Remove(rating);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RatingExists(int id)
        {
          return (_context.Ranking?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
