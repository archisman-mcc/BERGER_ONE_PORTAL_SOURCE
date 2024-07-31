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
        #endregion

        #region For Form Menu Master:
        Task<DynamicResponse?> FormMenuMasterList(FormMenuFetchRequestDto dto);
        Task<FormMenuSaveResponse?> FormMenuMasterInsert(FormMenuInsertRequestDto request);
        #endregion

        #region For Common Actions Only:
        Task<ParentMenuResponse?> GetAllParentMenu(ParentMenuRequestDto dto);
        #endregion
    }
}
