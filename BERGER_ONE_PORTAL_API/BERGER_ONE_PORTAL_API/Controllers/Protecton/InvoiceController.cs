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
    public class InvoiceController : ControllerBase
    {
        [HttpGet]
        public async Task<InvoiceResponseDto?> GetInvoiceDetails([FromServices] IInvoiceLogic _invoiceLogic, [FromQuery] InvoiceDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _invoiceLogic.GetInvoiceDetails(dto, userDetails.user_id);
        }
    }
}
