using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse;
using Newtonsoft.Json.Linq;

namespace BERGER_ONE_PORTAL_API.Logic
{
    public interface ICommonLogic
    {
        #region For User Profile:
        Task<JObject?> GetUserList(UserListDto dto);
        Task<UserProfileResponse?> GetUserDetails(UserProfileDetailsRequest dto);
        Task<UserAppsResponseDto?> GetAppList();
        Task<DynamicResponse?> GetReportingUser(ReportingUserRequest request);
        Task<UserDeptResponseDto?> GetDeptList(UserDeptRequestDto request);
        Task<UserDepotResponseDto?> GetApplicableDepotList(UserDepotRequestDto request);
        Task<UserApplAppResponseDto?> GetApplicableAppList(UserApplAppRequestDto request);
        Task<AllUserGroupResponseDto?> GetAllUserGroupList(AllUserGroupRequestDto request);
        Task<UserTerrResponseDto?> GetTerrDepotWise(UserTerrRequestDto request);
        Task<UserInsertResponseDto?> UserProfileInsert(UserInsertRequestDto request);
        #endregion

        #region For Form Menu Master:
        Task<FormMenuResponse?> FormMenuMasterList(FormMenuFetchRequestDto dto);
        Task<FormMenuSaveResponse?> FormMenuMasterInsert(FormMenuInsertRequestDto request);
        #endregion

        #region For User Form Access:
        Task<UserAccessFormsResponse?> GetUserApplicableForms(UserAccessFormsRequest request);
        Task<UserAccessFormsResponse?> GetUserAvailableForms(UserAccessFormsRequest request);
        Task<UserAccessFormsSaveResponse?> UserFormAccessInsert(UserAccessFormsInserRequest request);
        #endregion

        #region For Common Actions Only:
        Task<ParentMenuResponse?> GetAllParentMenu(ParentMenuRequestDto dto);
        Task<UserGroupAllResponse?> GetAllUserGroup(UserGroupAllRequest request);
        Task<UserByGroupResponse?> GetUserListByGroup(UserByGroupRequest request);
        #endregion
    }
}
