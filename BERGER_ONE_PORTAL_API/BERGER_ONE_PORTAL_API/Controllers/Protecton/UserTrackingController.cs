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
    public class UserTrackingController : ControllerBase
    {
        [HttpPost]
        public async Task<UserTrackingResponseDto?> GetDSRRegn([FromServices] IUserTrackingLogic _userTrackingLogic, [FromBody] UserTrackingRequestDto dto)
        {
            return await _userTrackingLogic.GetDSRRegn(dto);
        }

        [HttpPost]
        public async Task<UserTrackingResponseDto?> GetDSRRegnCat([FromServices] IUserTrackingLogic _userTrackingLogic, [FromBody] DSRRegionCatRequestDto dto)
        {
            return await _userTrackingLogic.GetDSRRegnCat(dto);
        }

        [HttpPost]
        public async Task<UserTrackingResponseDto?> GetDSRRegnTiger([FromServices] IUserTrackingLogic _userTrackingLogic, [FromBody] DSRRegionCatRequestDto dto)
        {
            return await _userTrackingLogic.GetDSRRegnTiger(dto);
        }

        [HttpPost]
        public async Task<UserTrackingResponseDto?> GetDSRRegnOther([FromServices] IUserTrackingLogic _userTrackingLogic, [FromBody] DSRRegionCatRequestDto dto)
        {
            return await _userTrackingLogic.GetDSRRegnOther(dto);
        }

        [HttpPost]
        public async Task<UserTrackingResponseDto?> GetHistory([FromServices] IUserTrackingLogic _userTrackingLogic, [FromBody] GetHistoryRequestDto dto)
        {
            return await _userTrackingLogic.GetHistory(dto);
        }

        [HttpPost]
        public async Task<UserTrackingResponseDto?> GetUserCollectionList([FromServices] IUserTrackingLogic _userTrackingLogic, [FromBody] UserCollectionListRequestDto dto)
        {
            return await _userTrackingLogic.GetUserCollectionList(dto);
        }

        [HttpPost]
        public async Task<UserTrackingResponseDto?> GetVisitHistoryUserwise([FromServices] IUserTrackingLogic _userTrackingLogic, [FromBody] GetVisitHistoryUserwiseRequestDto dto)
        {
            return await _userTrackingLogic.GetVisitHistoryUserwise(dto);
        }

        [HttpPost]
        public async Task<UserTrackingResponseDto?> GetVisitHistoryLocation([FromServices] IUserTrackingLogic _userTrackingLogic, [FromBody] GetVisitHistoryLocationRequestDto dto)
        {
            return await _userTrackingLogic.GetVisitHistoryLocation(dto);
        }
    }
}
