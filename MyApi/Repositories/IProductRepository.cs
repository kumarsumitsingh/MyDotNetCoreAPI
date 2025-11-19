using MyApi.Models;

namespace MyApi.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(int id);
        Task<Product>  AddAsync(Product product);
        Task UpdateAsync(Product product);
        Task<bool> DeleteAsync(int id);
    }
}