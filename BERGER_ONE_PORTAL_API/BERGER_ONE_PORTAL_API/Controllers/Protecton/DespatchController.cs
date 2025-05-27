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
    public class DespatchController : ControllerBase
    {
        [HttpGet]
        public async Task<DespatchResponseDto?> GetDespatchDetails([FromServices] DespatchLogic _despatchLogic, [FromQuery] DespatchDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _despatchLogic.GetDespatchDetails(dto, userDetails.user_id);
        }
    }
}
