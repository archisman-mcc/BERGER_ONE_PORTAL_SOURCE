using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BERGER_ONE_PORTAL_API.Dtos;
using BERGER_ONE_PORTAL_API.Logic;
using Newtonsoft.Json.Linq;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Filters;
using BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using Microsoft.AspNetCore.Cors;

namespace BERGER_ONE_PORTAL_API.Controllers
{
    [Route(Constant.Common.PortalAPIPrefix + "[controller]/[action]")]
    [ApiController]
    [Authorize]
    [ServiceFilter(typeof(FluentValidationActionFilterAttribute))]
    [ServiceFilter(typeof(ErrorHandlerFilterAttribute))]
    [ServiceFilter(typeof(APILogAttribute))]
    public class CommonController : ControllerBase
    {
        private readonly ICommonLogic _commonLogic;

        public CommonController(ICommonLogic commonLogic)
        {
            _commonLogic = commonLogic;
        }

        [EnableCors("AllowOrigin")]         
        [HttpPost]
        public async Task<JObject?> GetUserList([FromBody] UserListDto dto) => await _commonLogic.GetUserList(dto);

        [HttpPost]
        public async Task<UserProfileResponse?> GetUserDetails([FromBody] UserProfileDetailsRequest dto) => await _commonLogic.GetUserDetails(dto);

        [HttpPost]
        public async Task<UserAppsResponseDto?> GetAppList() => await _commonLogic.GetAppList();


    }
}
