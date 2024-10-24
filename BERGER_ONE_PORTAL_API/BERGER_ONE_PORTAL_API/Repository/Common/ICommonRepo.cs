using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Common
{
    public interface ICommonRepo
    {
        #region For User Profile:
        Task<MSSQLResponse?> GetUserList(UserListDto dto);
        Task<MSSQLResponse?> GetUserDetails(UserProfileDetailsRequest dto);
        Task<MSSQLResponse?> GetAppListData();
        Task<MSSQLResponse?> GetReportingUser(ReportingUserRequest dto);
        Task<MSSQLResponse?> GetDeptList(UserDeptRequestDto dto);
        Task<MSSQLResponse?> GetApplicableDepotList(UserDepotRequestDto dto);
        Task<MSSQLResponse?> GetApplicableAppList(UserApplAppRequestDto dto);
        Task<MSSQLResponse?> GetAllUserGroupList(AllUserGroupRequestDto dto);
        Task<MSSQLResponse?> GetTerrDepotWise(UserTerrRequestDto dto);
        Task<MSSQLResponse> UserProfileInsert(UserInsertRequestDto request, string user_id);
        Task<MSSQLResponse?> GetApplicableTerrList(UserApplTerrRequestDto dto);
        Task<MSSQLResponse?> GetLegalStatusList(LeaglStatusRequestDto dto);
        #endregion

        #region For Form Menu Master:
        Task<MSSQLResponse?> FormMenuMasterList(FormMenuFetchRequestDto dto);
        Task<MSSQLResponse> FormMenuMasterInsert(FormMenuInsertRequestDto request);
        #endregion

        #region For User Form Access:
        Task<MSSQLResponse?> GetUserApplicableForms(UserAccessFormsRequest dto);
        Task<MSSQLResponse?> GetUserAvailableForms(UserAccessFormsRequest dto);
        Task<MSSQLResponse> UserFormAccessInsert(UserAccessFormsInserRequest request);
        #endregion

        #region For Common Actions Only:
        Task<MSSQLResponse?> GetAllParentMenu(ParentMenuRequestDto dto);
        Task<MSSQLResponse?> GetAllUserGroup(UserGroupAllRequest dto);
        Task<MSSQLResponse?> GetUserListByGroup(UserByGroupRequest dto);
        #endregion
    }
}
