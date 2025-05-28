using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface IClientTrackLogic
    {
        Task<ClientTrackResponseDto?> GetCTDealer(ClientTrackDealerRequestDto? request, string user_id);
        Task<ClientTrackResponseDto?> GetCTDetail(ClientTrackDetailRequestDto? request, string user_id);
        Task<ClientTrackResponseDto?> GetCTDetailTiger(ClientTrackTigerRequestDto? request, string user_id);
        Task<ClientTrackResponseDto?> GetCTOtherDetail(ClientTrackOtherDetailRequestDto? request, string user_id);
    }
}
