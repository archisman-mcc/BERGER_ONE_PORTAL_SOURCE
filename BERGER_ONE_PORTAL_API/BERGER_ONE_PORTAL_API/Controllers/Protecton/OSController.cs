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
    public class OSController : ControllerBase
    {
        [HttpPost]
        public async Task<OSResponseDto?> UserApplDlrOSDtls([FromServices] IOSLogic _osLogic, [FromBody] GetOSRequestDtlsDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _osLogic.UserApplOSDetails(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<OSResponseDto?> UserApplDlrOSSingle([FromServices] IOSLogic _osLogic, [FromBody] GetOSSingleSmryRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _osLogic.UserApplDlrOSSingle(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<OSResponseDto?> UserApplDlrOSTrx([FromServices] IOSLogic _osLogic, [FromBody] GetTRXSmryRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _osLogic.UserApplDlrOSTrx(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<OSResponseDto?> ODbyDateList([FromServices] IOSLogic _osLogic, [FromBody] ODbyDateListDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _osLogic.ODbyDateList(dto, userDetails.user_id);
        }
    }
}
