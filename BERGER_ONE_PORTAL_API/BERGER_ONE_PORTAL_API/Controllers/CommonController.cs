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

        #region For User Profile:
        [HttpPost]
        public async Task<JObject?> GetUserList([FromBody] UserListDto dto) => await _commonLogic.GetUserList(dto);

        [HttpPost]
        public async Task<UserProfileResponse?> GetUserDetails([FromBody] UserProfileDetailsRequest dto) => await _commonLogic.GetUserDetails(dto);

        [HttpPost]
        public async Task<UserAppsResponseDto?> GetAppList() => await _commonLogic.GetAppList();

        [HttpPost]
        public async Task<DynamicResponse?> GetReportingUser([FromBody] ReportingUserRequest dto) => await _commonLogic.GetReportingUser(dto);
        #endregion

        #region For Form Menu Master:  
        [HttpPost]
        [Route("FormMenuMasterList")]
        public async Task<DynamicResponse?> FormMenuMasterList([FromBody] FormMenuFetchRequest dto) => await _commonLogic.FormMenuMasterList(dto);

        [HttpPost]
        [Route("FormMenuMasterInsert")]
        public async Task<FormMenuSaveResponse?> FormMenuMasterInsert([FromBody] FormMenuInsertRequest dto) => await _commonLogic.FormMenuMasterInsert(dto);
        #endregion

        #region For User Form Access :  
        //[HttpPost]
        //[Route("GetUserApplicableForms")]
        //public async Task<UserAccessFormsResponse?> GetUserApplicableForms([FromBody] UserAccessFormsRequest dto)
        //{
        //    return await _adminLogic.GetUserApplicableForms(dto);
        //}

        //[HttpPost]
        //[Route("GetUserAvailableForms")]
        //public async Task<UserAccessFormsResponse?> GetUserAvailableForms([FromBody] UserAccessFormsRequest dto)
        //{
        //    return await _adminLogic.GetUserAvailableForms(dto);
        //}

        //[HttpPost]
        //[Route("UserFormAccessInsert")]
        //public async Task<UserAccessFormsSaveResponse?> UserFormAccessInsert([FromBody] UserAccessFormsInserRequest dto)
        //{
        //    return await _adminLogic.UserFormAccessInsert(dto);
        //}
        #endregion
    }
}
