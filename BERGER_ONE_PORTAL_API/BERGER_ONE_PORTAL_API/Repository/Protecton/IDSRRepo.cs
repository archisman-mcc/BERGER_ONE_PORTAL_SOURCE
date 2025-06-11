using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public interface IDSRRepo
    {
        Task<MSSQLResponse?> UserApplDlrSales(UserApplDlrSalesRequest request, string user_id);
        Task<MSSQLResponse?> UserApplDlrSalesDtls(UserApplDlrSalesDtlsRequest? request, string user_id);
    }
}
