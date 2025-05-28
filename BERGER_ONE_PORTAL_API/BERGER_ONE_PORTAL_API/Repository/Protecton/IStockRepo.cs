using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public interface IStockRepo
    {
        Task<MSSQLResponse?> GetPrdList(StockProductRequestDto? request, string user_id);
        Task<MSSQLResponse?> GetShdList(StockShadeRequestDto? request, string user_id);
        Task<MSSQLResponse?> GetSkuList(StockSkuListRequestDto? request, string user_id);
        Task<MSSQLResponse?> GetActionCatList(string user_id);
        Task<MSSQLResponse?> GetActionRcList(ActionRcListDto request, string user_id);
        Task<MSSQLResponse?> ActionDefaulterList(ActionDefaulterListDto request, string user_id);
        Task<MSSQLResponse?> GetReqList(StockReqListRequestDto? request, string user_id);
    }
}
