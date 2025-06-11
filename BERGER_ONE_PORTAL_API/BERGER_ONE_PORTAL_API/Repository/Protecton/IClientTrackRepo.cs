using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public interface IClientTrackRepo
    {
        Task<MSSQLResponse?> GetCTDealer(ClientTrackDealerRequestDto? request, string user_id);
        Task<MSSQLResponse?> GetCTDetail(ClientTrackDetailRequestDto? request, string user_id);
        Task<MSSQLResponse?> GetCTDetailTiger(ClientTrackTigerRequestDto? request, string user_id);
        Task<MSSQLResponse?> GetCTOtherDetail(ClientTrackOtherDetailRequestDto? request, string user_id);
    }
}
