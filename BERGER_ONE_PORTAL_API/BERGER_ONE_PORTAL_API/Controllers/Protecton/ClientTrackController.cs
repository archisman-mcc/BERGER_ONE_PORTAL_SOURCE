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
    public class ClientTrackController : ControllerBase
    {
        [HttpPost]
        public async Task<ClientTrackResponseDto?> GetCTDealer([FromServices] IClientTrackLogic _clientTrackingLogic, [FromBody] ClientTrackDealerRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _clientTrackingLogic.GetCTDealer(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<ClientTrackResponseDto?> GetCTDetail([FromServices] IClientTrackLogic _clientTrackingLogic, [FromBody] ClientTrackDetailRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _clientTrackingLogic.GetCTDetail(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<ClientTrackResponseDto?> GetCTDetailTiger([FromServices] IClientTrackLogic _clientTrackingLogic, [FromBody] ClientTrackTigerRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _clientTrackingLogic.GetCTDetailTiger(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<ClientTrackResponseDto?> GetCTOtherDetail([FromServices] IClientTrackLogic _clientTrackingLogic, [FromBody] ClientTrackOtherDetailRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _clientTrackingLogic.GetCTOtherDetail(dto, userDetails.user_id);
        }
    }
}
