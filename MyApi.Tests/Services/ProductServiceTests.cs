using Xunit;
using FluentAssertions;
using Moq;
using MyApi.Models;
using MyApi.Repositories;
using MyApi.Services;

namespace MyApi.Tests.Services
{
    public class ProductServiceTests
    {
        private readonly Mock<IProductRepository> _repoMock;
        private readonly ProductService _service;

        public ProductServiceTests()
        {
            _repoMock = new Mock<IProductRepository>();
            _service = new ProductService(_repoMock.Object);
        }

        [Fact]
        public async Task GetAllAsync_ReturnsProductList()
        {
            // Arrange
            var products = new List<Product>
            {
                new Product { Id = 1, Name = "A", Price = 10 }
            };

            _repoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(products);

            // Act
            var result = await _service.GetAllAsync();

            // Assert
            result.Should().HaveCount(1);
            result.First().Name.Should().Be("A");
        }
    }
}
