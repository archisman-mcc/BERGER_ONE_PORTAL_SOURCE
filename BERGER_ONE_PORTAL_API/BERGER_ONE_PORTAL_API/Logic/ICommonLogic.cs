using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse;
using Newtonsoft.Json.Linq;

namespace BERGER_ONE_PORTAL_API.Logic
{
    public interface ICommonLogic
    {
        Task<JObject?> GetUserList(UserListDto dto);

        Task<UserProfileResponse?> GetUserDetails(UserProfileDetailsRequest dto);
    }
}
