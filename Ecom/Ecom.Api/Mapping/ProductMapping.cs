﻿using AutoMapper;
using Ecom.Core.DTOs;
using Ecom.Core.Entites.Products;

namespace Ecom.Api.Mapping
{
    public class ProductMapping:Profile
    {
        public ProductMapping() 
        {
            CreateMap<Product,ProductDTO>()
                .ForMember(x=>x.CategoryName
                ,op=>op.MapFrom(src=>src.Category.Name))
                .ReverseMap();
            CreateMap<PhotoDTO, Photo>().ReverseMap();
            CreateMap<UpdateProductDTO,Product>()
                .ForMember(x => x.Photos
                , op => op.Ignore())
                .ReverseMap();
            CreateMap<CreateProductDTO,Product>()
                .ForMember(x=>x.Photos
                ,op=>op.Ignore())
                .ReverseMap();

        }
    }
}
