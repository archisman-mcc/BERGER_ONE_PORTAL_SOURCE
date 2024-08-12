using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Filters;
using BERGER_ONE_PORTAL_API.Logic;
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
    public class EpcaController : ControllerBase
    {

        private readonly IEpcaLogic _ePcaLogic;

        public EpcaController(IEpcaLogic ePcaLogic) { _ePcaLogic = ePcaLogic; }

        [HttpPost]
        public async Task<EpcaStatusResponseDto?> GetPcaStatusList([FromBody] pcaStatusRequestDto dto) => await _ePcaLogic.GetPcaStatusList(dto);

        [HttpPost]
        public async Task<EpcaResponseDto?> GetePCAList([FromBody] GetePCAListRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetePCAList(dto, userDetails.user_id);
        }
    }
}
