using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public interface ILegalRepo
    {
        Task<MSSQLResponse?> GetLegalOutStandingApprovalList(LegalOutStandingRequestDto request, string user_id);
    }
}
