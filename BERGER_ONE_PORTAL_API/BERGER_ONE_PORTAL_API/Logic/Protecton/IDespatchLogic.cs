using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface IDespatchLogic
    {
        Task<DespatchResponseDto> GetDespatchDetails(DespatchDetailsRequestDto? request, string user_id);
    }
}
