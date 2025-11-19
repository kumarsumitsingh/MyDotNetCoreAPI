using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using MyApi.Controllers;
using MyApi.Dtos;
using MyApi.Models;
using MyApi.Services;

namespace MyApi.Tests.Controllers
{
    public class ProductControllerTests
    {
        private readonly Mock<IProductService> _serviceMock;
        private readonly ProductController _controller;

        public ProductControllerTests()
        {
            _serviceMock = new Mock<IProductService>();
            _controller = new ProductController(_serviceMock.Object);
        }

        [Fact]
        public async Task GetAllProducts_ReturnsOkWithDtos()
        {
            // Arrange
            var products = new List<Product>
            {
                new Product { Id = 1, Name = "A", Price = 10 }
            };

            _serviceMock.Setup(s => s.GetAllAsync()).ReturnsAsync(products);

            // Act
            var response = await _controller.GetAllProducts();
            var okResult = response.Result as OkObjectResult;

            // Assert
            okResult.Should().NotBeNull();
            var dtos = okResult!.Value as IEnumerable<ProductReadDto>;
            dtos!.Should().HaveCount(1);
        }
    }
}
