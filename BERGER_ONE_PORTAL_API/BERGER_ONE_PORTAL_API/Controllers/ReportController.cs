using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Filters;
using BERGER_ONE_PORTAL_API.Logic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BERGER_ONE_PORTAL_API.Controllers
{
    [Route(Constant.Common.PortalAPIPrefix + "[controller]/[action]")]
    [ApiController]
    //[Authorize]
    [ServiceFilter(typeof(FluentValidationActionFilterAttribute))]
    [ServiceFilter(typeof(ErrorHandlerFilterAttribute))]
    [ServiceFilter(typeof(APILogAttribute))]
    public class ReportController : ControllerBase
    {
        #region "FOR EXCEL REPORT API"
        [HttpPost]
        public async Task<FilePathResponse?> LegalCaseApprovalAsmReport([FromServices] IReportLogic _reportLogic, [FromBody] LegalOutStandingRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _reportLogic.LegalCaseApprovalAsmReport(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<IActionResult?> GetLegalCaseApprovalAsmReport([FromServices] IReportLogic _reportLogic, [FromBody] LegalOutStandingRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            dto.UspUserId = userDetails.user_id;
            return await _reportLogic.GetLegalCaseApprovalAsmReport(dto);
        }
        #endregion

        #region "FOR PDF REPORT API"
        #endregion
    }
}
