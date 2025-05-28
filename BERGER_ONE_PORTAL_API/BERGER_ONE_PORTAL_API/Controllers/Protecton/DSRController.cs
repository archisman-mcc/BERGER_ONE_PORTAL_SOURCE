using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse;
using BERGER_ONE_PORTAL_API.Filters;
using BERGER_ONE_PORTAL_API.Logic;
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
    public class DSRController : ControllerBase
    {

        [HttpPost]
        public async Task<UserApplDlrSalesResponse?> UserApplDlrSales([FromServices] IDSRLogic _DSRLogic, [FromBody] UserApplDlrSalesRequest dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _DSRLogic.UserApplDlrSales(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<UserApplDlrSalesResponse?> UserApplDlrSalesDtls([FromServices] IDSRLogic _dsrLogic, [FromBody] UserApplDlrSalesDtlsRequest dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _dsrLogic.UserApplDlrSalesDtls(dto, userDetails.user_id);
        }

    }
}
