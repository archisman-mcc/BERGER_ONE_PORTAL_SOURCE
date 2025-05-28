using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface IUserTrackingLogic
    {
        Task<UserTrackingResponseDto> GetDSRRegn(UserTrackingRequestDto? request);
        Task<UserTrackingResponseDto> GetDSRRegnCat(DSRRegionCatRequestDto? request);
        Task<UserTrackingResponseDto> GetDSRRegnTiger(DSRRegionCatRequestDto? request);
        Task<UserTrackingResponseDto> GetDSRRegnOther(DSRRegionCatRequestDto? request);
        Task<UserTrackingResponseDto> GetHistory(GetHistoryRequestDto? request);
        Task<UserTrackingResponseDto> GetUserCollectionList(UserCollectionListRequestDto? request);
        Task<UserTrackingResponseDto> GetVisitHistoryUserwise(GetVisitHistoryUserwiseRequestDto? request);
        Task<UserTrackingResponseDto> GetVisitHistoryLocation(GetVisitHistoryLocationRequestDto? request);
    }
}
