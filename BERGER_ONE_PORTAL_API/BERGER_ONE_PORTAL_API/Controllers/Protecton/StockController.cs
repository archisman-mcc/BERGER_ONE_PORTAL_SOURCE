using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Filters;
using BERGER_ONE_PORTAL_API.Logic.Protecton;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BERGER_ONE_PORTAL_API.Controllers.Protecton
{
    [ApiController]
    [Authorize]
    [Route(Constant.Common.APIPrefix + Constant.ProjectName.PROTECTON + "/[controller]/[action]")]
    [ServiceFilter(typeof(FluentValidationActionFilterAttribute))]
    [ServiceFilter(typeof(ErrorHandlerFilterAttribute))]
    [ServiceFilter(typeof(APILogAttribute))]
    public class StockController : ControllerBase
    {
        [HttpPost]
        public async Task<StockResponseDto?> GetPrdList([FromServices] IStockLogic _stockLogic, [FromBody] StockProductRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _stockLogic.GetPrdList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<StockResponseDto?> GetShdList([FromServices] IStockLogic _stockLogic, [FromBody] StockShadeRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _stockLogic.GetShdList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<StockResponseDto?> GetSkuList([FromServices] IStockLogic _stockLogic, [FromBody] StockSkuListRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _stockLogic.GetSkuList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<StockResponseDto?> GetActionCatList([FromServices] IStockLogic _stockLogic)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _stockLogic.GetActionCatList(userDetails.user_id);
        }

        [HttpPost]
        public async Task<StockResponseDto?> GetActionRcList([FromServices] IStockLogic _stockLogic, [FromBody] ActionRcListDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _stockLogic.GetActionRcList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<StockResponseDto?> ActionDefaulterList([FromServices] IStockLogic _stockLogic, [FromBody] ActionDefaulterListDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _stockLogic.ActionDefaulterList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<StockResponseDto?> GetReqList([FromServices] IStockLogic _stockLogic, [FromBody] StockReqListRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _stockLogic.GetReqList(dto, userDetails.user_id);
        }
    }
}
