using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public interface IBillingRepo
    {
        Task<MSSQLResponse?> GetBillingList(GetBillingListRequestDto? request, string user_id);
        Task<MSSQLResponse?> GetBillingDetails(GetBillingDetailsRequestDto? request, string user_id);
        Task<MSSQLResponse?> GetBillingTLVBalance(GetBillingTLVBalanceRequestDto? request, string user_id);
        Task<MSSQLResponse?> InsertBillingSKU(InsertBillingSKURequestDto? request, string user_id);
        Task<MSSQLResponse?> SendBillingDetails(GetBillingDetailsRequestDto? request, string user_id);
    }
}
