using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface IBillingLogic
    {
        Task<BillingResponseDto> GetBillingList(GetBillingListRequestDto requestDto, string user_id);
        Task<BillingResponseDto> GetBillingDetails(GetBillingDetailsRequestDto requestDto, string user_id);
        Task<BillingResponseDto> GetBillingTLVBalance(GetBillingTLVBalanceRequestDto requestDto, string user_id);
        Task<BillingResponseDto?> InsertBillingSKU(InsertBillingSKURequestDto? request, string user_id);
        Task<BillingResponseDto> SendBillingDetails(GetBillingDetailsRequestDto requestDto, string user_id);
    }
}
