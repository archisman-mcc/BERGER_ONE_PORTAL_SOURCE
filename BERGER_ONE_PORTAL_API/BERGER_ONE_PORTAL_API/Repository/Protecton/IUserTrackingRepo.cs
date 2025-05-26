using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public interface IUserTrackingRepo
    {
        Task<MSSQLResponse?> GetDSRRegn(UserTrackingRequestDto? request);
        Task<MSSQLResponse?> GetDSRRegnCat(DSRRegionCatRequestDto? request);
        Task<MSSQLResponse?> GetDSRRegnTiger(DSRRegionCatRequestDto? request);
        Task<MSSQLResponse?> GetDSRRegnOther(DSRRegionCatRequestDto? request);
        Task<MSSQLResponse?> GetHistory(GetHistoryRequestDto? request);
        Task<MSSQLResponse?> GetUserCollectionList(UserCollectionListRequestDto? request);
        Task<MSSQLResponse?> GetVisitHistoryUserwise(GetVisitHistoryUserwiseRequestDto? request, string rel_path);
        Task<MSSQLResponse?> GetVisitHistoryLocation(GetVisitHistoryLocationRequestDto? request);
    }
}
