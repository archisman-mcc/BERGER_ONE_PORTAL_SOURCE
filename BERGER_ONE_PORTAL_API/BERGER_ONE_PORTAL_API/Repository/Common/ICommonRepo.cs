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
        #endregion

        #region For Form Menu Master:
        Task<MSSQLResponse?> FormMenuMasterList(FormMenuFetchRequest dto);
        Task<MSSQLResponse> FormMenuMasterInsert(FormMenuInsertRequest request);
        #endregion
    }
}
