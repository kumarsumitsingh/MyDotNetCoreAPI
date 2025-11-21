using Microsoft.AspNetCore.Mvc;
using MyApi.Models;
using MyApi.Services;
using MyApi.Dtos;
using AutoMapper;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService,IMapper mapper)
        {
            _productService = productService;
            _mapper=mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReadDto>>> GetAllProducts()
        {
            /* start Before AutoMapper
            var products = await _productService.GetAllAsync();

            var productDtos = products.Select(p => new ProductReadDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price
            });
            end Before AutoMapper */
            
            var products = await _productService.GetAllAsync();
            var productDtos=_mapper.Map<IEnumerable<ProductReadDto>>(products);

            return Ok(productDtos);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(_mapper.Map<ProductReadDto>(product));
        }

        [HttpPost]
        public async Task<ActionResult<ProductReadDto>> CreateProduct([FromBody]ProductCreateDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price

            };
            var created = await _productService.CreateAsync(product);
            
            /*var readDto = new ProductReadDto
            {
                Id = created.Id,
                Name = created.Name,
                Price = created.Price

            };*/

            var readDto = _mapper.Map<Product>(dto);
            return CreatedAtAction(nameof(CreateProduct), new { id = created.Id }, readDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, [FromBody]ProductUpdateDto dto)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product == null)
                return NotFound();

            product.Name = dto.Name;
            product.Price = dto.Price;

            await _productService.UpdateAsync(id, product);
            return NoContent();
            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var success = await _productService.DeleteAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
