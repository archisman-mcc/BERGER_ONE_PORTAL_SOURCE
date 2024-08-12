using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface IEpcaLogic
    {
        Task<EpcaStatusResponseDto?> GetPcaStatusList(pcaStatusRequestDto request);
        Task<EpcaResponseDto?> GetePCAList(GetePCAListRequestDto request, string user_id);
    }
}
