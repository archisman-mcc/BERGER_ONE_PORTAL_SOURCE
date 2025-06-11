using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Filters;
using BERGER_ONE_PORTAL_API.Logic.Protecton;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BERGER_ONE_PORTAL_API.Controllers.Protecton
{
    [Route(Constant.Common.PortalAPIPrefix + "[controller]/[action]")]
    [ApiController]
    [Authorize]
    [ServiceFilter(typeof(FluentValidationActionFilterAttribute))]
    [ServiceFilter(typeof(ErrorHandlerFilterAttribute))]
    [ServiceFilter(typeof(APILogAttribute))]
    public class LegalController : ControllerBase
    {
        #region "Legal Case Approval Common API's"
        #endregion

        #region "Legal Case Approval (ASM) - Protecton"
        [HttpPost]
        public async Task<LegalResponseDto?> GetLegalOutStandingApprovalList([FromServices] ILegalLogic _legalLogic, [FromBody] LegalOutStandingRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _legalLogic.GetLegalOutStandingApprovalList(dto, userDetails.user_id);
        }
        #endregion

    }
}
