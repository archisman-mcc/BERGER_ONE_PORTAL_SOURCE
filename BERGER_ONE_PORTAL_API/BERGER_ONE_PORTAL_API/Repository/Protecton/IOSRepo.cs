using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public interface IOSRepo
    {
        Task<MSSQLResponse?> UserApplOSDetails(GetOSRequestDtlsDto request, string user_id);
        Task<MSSQLResponse?> UserApplDlrOSSingle(GetOSSingleSmryRequestDto request, string user_id);
        Task<MSSQLResponse?> UserApplDlrOSTrx(GetTRXSmryRequestDto request, string user_id);
        Task<MSSQLResponse?> ODbyDateList(ODbyDateListDto request, string user_id);
    }
}
