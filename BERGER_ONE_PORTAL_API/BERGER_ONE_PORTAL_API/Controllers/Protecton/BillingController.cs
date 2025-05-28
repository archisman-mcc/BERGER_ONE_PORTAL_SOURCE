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
    public class BillingController : ControllerBase
    {
        [HttpGet]
        public async Task<BillingResponseDto?> GetBillingList([FromServices] IBillingLogic _billingLogic, [FromQuery] GetBillingListRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _billingLogic.GetBillingList(dto, userDetails.user_id);
        }

        [HttpGet]
        public async Task<BillingResponseDto?> GetBillingDetails([FromServices] IBillingLogic _billingLogic, [FromQuery] GetBillingDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _billingLogic.GetBillingDetails(dto, userDetails.user_id);
        }

        [HttpGet]
        public async Task<BillingResponseDto?> GetBillingTLVBalance([FromServices] IBillingLogic _billingLogic, [FromQuery] GetBillingTLVBalanceRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _billingLogic.GetBillingTLVBalance(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<BillingResponseDto?> InsertBillingSKU([FromServices] IBillingLogic _billingLogic, [FromBody] InsertBillingSKURequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _billingLogic.InsertBillingSKU(dto, userDetails.user_id);
        }

        [HttpGet]
        public async Task<BillingResponseDto?> SendBillingDetails([FromServices] IBillingLogic _billingLogic, [FromQuery] GetBillingDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _billingLogic.SendBillingDetails(dto, userDetails.user_id);
        }
    }
}
