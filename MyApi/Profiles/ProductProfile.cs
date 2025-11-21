using AutoMapper;
using MyApi.Models;
using MyApi.Dtos;

namespace MyApi.Profiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            // Model → ReadDTO
            CreateMap<Product, ProductReadDto>();

            // CreateDTO → Model
            CreateMap<ProductCreateDto, Product>();

            // UpdateDTO → Model
            CreateMap<ProductUpdateDto, Product>();
        }
    }
}
