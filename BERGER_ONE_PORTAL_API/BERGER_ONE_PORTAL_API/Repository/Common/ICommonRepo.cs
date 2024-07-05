using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Common
{
    public interface ICommonRepo
    {
        Task<MSSQLResponse?> GetUserList(UserListDto dto);
        Task<MSSQLResponse?> GetUserDetails(UserProfileDetailsRequest dto);
    }
}
