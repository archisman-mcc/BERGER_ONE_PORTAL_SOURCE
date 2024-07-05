using AutoMapper;
using BERGER_ONE_API.Dtos;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_API.Models;
using System.Reflection;

namespace BERGER_ONE_PORTAL_API.Repository.Utility
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ApiLogDBModel, ApiLogDBDto>();

            CreateMap<GetUserApplicableDealerReuqestDto, GetUserApplicableDealerModel>()
                .ForMember(dest => dest.app_id, opt => opt.MapFrom(src => src.app_id))
                .ForMember(dest => dest.depot_regn, opt => opt.MapFrom(src => src.depot_regn))
                .ForMember(dest => dest.state_regn, opt => opt.MapFrom(src => src.state_regn))
                .ForMember(dest => dest.depot_code, opt => opt.MapFrom(src => src.depot_code))
                .ForMember(dest => dest.terr_code, opt => opt.MapFrom(src => src.terr_code));

            CreateMap<GetApplicableDepotRequestDto, GetApplicableDepoModel>()
             .ForMember(dest => dest.app_id, opt => opt.MapFrom(src => src.app_id))
             .ForMember(dest => dest.depot_code, opt => opt.MapFrom(src => src.depot_code));

            CreateMap<GetRegionRequestDto, RegionRequestModel>()
            .ForMember(dest => dest.app_id, opt => opt.MapFrom(src => src.app_id))
            .ForMember(dest => dest.user_group, opt => opt.MapFrom(src => src.user_group));

            CreateMap<UpdatePromotionalMsgRequestDto, UpdatePromotionalMsgRequestModel>()
           .ForMember(dest => dest.app_id, opt => opt.MapFrom(src => src.app_id))
           .ForMember(dest => dest.msg_id, opt => opt.MapFrom(src => src.msg_id));

        }    
    }
}
