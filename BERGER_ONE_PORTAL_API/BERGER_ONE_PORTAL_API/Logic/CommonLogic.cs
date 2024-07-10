using System.Data;
using System.Net;
using BERGER_ONE_PORTAL_API.NotificationSender;
using Constant = BERGER_ONE_PORTAL_API.Common.Utilty.Constant;
using BERGER_ONE_PORTAL_API.Repository.JWT;

using BERGER_ONE_PORTAL_API.Dtos;
using BERGER_ONE_PORTAL_API.Repository.Login;
using BERGER_ONE_PORTAL_API.Models;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using Newtonsoft.Json.Linq;
using BERGER_ONE_PORTAL_API.Repository.Common;
using BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse;

namespace BERGER_ONE_PORTAL_API.Logic
{
    public class CommonLogic:ICommonLogic
    {
        public ICommonRepo _commonRepo;
        private readonly IJwtManager _jwtManager;
        public CommonLogic(ICommonRepo commonRepo, IJwtManager jwtManager)
        {

            _commonRepo = commonRepo;
            _jwtManager = jwtManager;
        }

        public async Task<JObject?> GetUserList(UserListDto dto)
        {

            MSSQLResponse? dataResponse = await _commonRepo.GetUserList(dto);
            return UserAdapter.MapUserListResponse(dataResponse, dto);

             
        }

        public async Task<UserProfileResponse?> GetUserDetails(UserProfileDetailsRequest dto)
        {
            UserProfileResponse? response = null;

            MSSQLResponse? dataResponse = await _commonRepo.GetUserDetails(dto);
            response = UserAdapter.MapUserDetailsResponse(dataResponse);

            return response;
        }

        public async Task<UserAppsResponseDto?> GetAppList()
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetAppListData();
            return UserAdapter.MapAppResponse(dataResponse);
        }
    }
}
