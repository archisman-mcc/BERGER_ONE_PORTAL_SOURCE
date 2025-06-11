using BERGER_ONE_PORTAL_API.Dtos;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface IDSRLogic
    {
        Task<UserApplDlrSalesResponse?> UserApplDlrSales(UserApplDlrSalesRequest request, string user_id);
        Task<UserApplDlrSalesResponse?> UserApplDlrSalesDtls(UserApplDlrSalesDtlsRequest? request, string user_id);
    }
}
