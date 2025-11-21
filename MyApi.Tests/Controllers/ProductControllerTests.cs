using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using MyApi.Controllers;
using MyApi.Dtos;
using MyApi.Models;
using MyApi.Services;
using AutoMapper;
using MyApi.Profiles;

namespace MyApi.Tests.Controllers
{
    public class ProductControllerTests
    {
        private readonly Mock<IProductService> _serviceMock;
        private readonly ProductController _controller;
        private readonly IMapper _mapper;

        public ProductControllerTests()
        {
            var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<ProductProfile>();
        });

        config.AssertConfigurationIsValid(); // helps detect errors

        _mapper = config.CreateMapper();

        }

        [Fact]
    public void ProductCreateDto_Maps_To_Product()
    {
        var dto = new ProductCreateDto
        {
            Name = "Test Product",
            Price = 10.99M
        };

        var product = _mapper.Map<Product>(dto);

        Assert.Equal(dto.Name, product.Name);
        Assert.Equal(dto.Price, product.Price);
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
