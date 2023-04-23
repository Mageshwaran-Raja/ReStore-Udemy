using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(string orderBy, string searchTerm, 
            string brands, string types) 
        {
            var query = _context.Products.Sort(orderBy)
                .Search(searchTerm).Filter(brands, types)
                .AsQueryable();

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductsById(int id)
        {
            var result = await _context.Products.FindAsync(id);
            if (result == null) return NotFound();
            return result;
        } 
    }
}