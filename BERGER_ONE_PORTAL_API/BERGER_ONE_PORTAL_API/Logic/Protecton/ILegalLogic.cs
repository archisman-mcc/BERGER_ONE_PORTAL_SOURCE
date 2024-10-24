using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using Newtonsoft.Json.Linq;


namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface ILegalLogic
    {
        Task<LegalResponseDto?> GetLegalOutStandingApprovalList(LegalOutStandingRequestDto request, string user_id);

    }
}
