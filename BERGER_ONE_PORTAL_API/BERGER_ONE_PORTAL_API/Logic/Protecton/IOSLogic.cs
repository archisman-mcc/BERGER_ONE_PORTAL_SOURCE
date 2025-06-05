using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface IOSLogic
    {
        Task<OSResponseDto> UserApplOSDetails(GetOSRequestDtlsDto requestDtos, string user_id);
        Task<OSResponseDto> UserApplDlrOSSingle(GetOSSingleSmryRequestDto requestDtos, string user_id);
        Task<OSResponseDto> UserApplDlrOSTrx(GetTRXSmryRequestDto requestDtos, string user_id);
        Task<OSResponseDto> ODbyDateList(ODbyDateListDto request, string user_id);
    }
}
