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
using BERGER_ONE_PORTAL_API.Models;

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

        public CommonController(ICommonLogic commonLogic) { _commonLogic = commonLogic; }

        #region For User Profile:
        [HttpPost]
        public async Task<JObject?> GetUserList([FromBody] UserListDto dto) => await _commonLogic.GetUserList(dto);

        [HttpPost]
        public async Task<UserProfileResponse?> GetUserDetails([FromBody] UserProfileDetailsRequest dto) => await _commonLogic.GetUserDetails(dto);

        [HttpPost]
        public async Task<UserAppsResponseDto?> GetAppList() => await _commonLogic.GetAppList();

        [HttpPost]
        public async Task<DynamicResponse?> GetReportingUser([FromBody] ReportingUserRequest dto) => await _commonLogic.GetReportingUser(dto);

        [HttpPost]
        public async Task<UserDeptResponseDto?> GetDeptList([FromBody] UserDeptRequestDto dto) => await _commonLogic.GetDeptList(dto);

        [HttpPost]
        public async Task<UserDepotResponseDto?> GetApplicableDepotList([FromBody] UserDepotRequestDto dto) => await _commonLogic.GetApplicableDepotList(dto);

        [HttpPost]
        public async Task<UserApplAppResponseDto?> GetApplicableAppList([FromBody] UserApplAppRequestDto dto) => await _commonLogic.GetApplicableAppList(dto);

        [HttpPost]
        public async Task<AllUserGroupResponseDto?> GetAllUserGroupList([FromBody] AllUserGroupRequestDto dto) => await _commonLogic.GetAllUserGroupList(dto);
        [HttpPost]
        public async Task<UserTerrResponseDto?> GetTerrDepotWise([FromBody] UserTerrRequestDto dto) => await _commonLogic.GetTerrDepotWise(dto);

        [HttpPost]
        public async Task<UserInsertResponseDto?> UserProfileInsert([FromBody] UserInsertRequestDto dto) => await _commonLogic.UserProfileInsert(dto);

        [HttpPost]
        public async Task<UserApplTerrResponseDto?> GetApplicableTerrList([FromBody] UserApplTerrRequestDto dto) => await _commonLogic.GetApplicableTerrList(dto);
        #endregion

        #region For Form Menu Master:  
        [HttpPost]
        public async Task<FormMenuResponse?> FormMenuMasterList([FromBody] FormMenuFetchRequestDto dto) => await _commonLogic.FormMenuMasterList(dto);

        [HttpPost]
        public async Task<FormMenuSaveResponse?> FormMenuMasterInsert([FromBody] FormMenuInsertRequestDto dto) => await _commonLogic.FormMenuMasterInsert(dto);
        #endregion

        #region For User Form Access :  
        [HttpPost]
        public async Task<UserAccessFormsResponse?> GetUserApplicableForms([FromBody] UserAccessFormsRequest dto) => await _commonLogic.GetUserApplicableForms(dto);

        [HttpPost]
        public async Task<UserAccessFormsResponse?> GetUserAvailableForms([FromBody] UserAccessFormsRequest dto) => await _commonLogic.GetUserAvailableForms(dto);

        [HttpPost]
        public async Task<UserAccessFormsSaveResponse?> UserFormAccessInsert([FromBody] UserAccessFormsInserRequest dto) => await _commonLogic.UserFormAccessInsert(dto);
        #endregion

        #region For Common Actions Only:
        [HttpPost]
        public async Task<ParentMenuResponse?> GetAllParentMenu([FromBody] ParentMenuRequestDto dto) => await _commonLogic.GetAllParentMenu(dto);

        [HttpPost]
        public async Task<UserGroupAllResponse?> GetAllUserGroup([FromBody] UserGroupAllRequest dto) => await _commonLogic.GetAllUserGroup(dto);

        [HttpPost]
        public async Task<UserByGroupResponse?> GetUserListByGroup([FromBody] UserByGroupRequest dto) => await _commonLogic.GetUserListByGroup(dto);
        #endregion

        #region For Password Encrypt & Decrypt:
        [HttpPost]
        public async Task<PwdEncryptDecryptResponse?> PasswordEncryptDecrypt([FromBody] PwdEncryptDecryptRequest dto) => await _commonLogic.PasswordEncryptDecrypt(dto);
        #endregion
    }
}
