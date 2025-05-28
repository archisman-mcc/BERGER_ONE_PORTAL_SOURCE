using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface IStockLogic
    {
        Task<StockResponseDto> GetPrdList(StockProductRequestDto? request, string user_id);
        Task<StockResponseDto> GetShdList(StockShadeRequestDto? request, string user_id);
        Task<StockResponseDto> GetSkuList(StockSkuListRequestDto? request, string user_id);
        Task<StockResponseDto> GetActionCatList(string user_id);
        Task<StockResponseDto> GetActionRcList(ActionRcListDto request, string user_id);
        Task<StockResponseDto> ActionDefaulterList(ActionDefaulterListDto request, string user_id);
        Task<StockResponseDto> GetReqList(StockReqListRequestDto? request, string user_id);
    }
}
