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

        #region For User Profile:
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

        public async Task<DynamicResponse?> GetReportingUser(ReportingUserRequest request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetReportingUser(request);
            return UserAdapter.MapReportingUserResponse(dataResponse);
        }

        public async Task<UserDeptResponseDto?> GetDeptList(UserDeptRequestDto request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetDeptList(request);
            return UserAdapter.MapUserDeptResponse(dataResponse);
        }

        public async Task<UserDepotResponseDto?> GetApplicableDepotList(UserDepotRequestDto request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetApplicableDepotList(request);
            return UserAdapter.MapUserDepotResponse(dataResponse);
        }
        #endregion

        #region For Form Menu Master:
        public async Task<DynamicResponse?> FormMenuMasterList(FormMenuFetchRequestDto dto)
        {
            MSSQLResponse? dataResponse = await _commonRepo.FormMenuMasterList(dto);
            return UserAdapter.MapGetFormMenuMasterResponse(dataResponse);
        }

        public async Task<FormMenuSaveResponse?> FormMenuMasterInsert(FormMenuInsertRequestDto request)
        {
            if (request == null) throw new ArgumentNullException(nameof(request));
            if (request?.fmm_id == null || string.IsNullOrWhiteSpace(request?.fmm_id)) throw new ArgumentNullException(nameof(request.fmm_id));
            if (request?.fmm_name == null || string.IsNullOrWhiteSpace(request?.fmm_name)) throw new ArgumentNullException(nameof(request.fmm_name));
            if (request?.fmm_link == null || string.IsNullOrWhiteSpace(request?.fmm_link)) throw new ArgumentNullException(nameof(request.fmm_link));
            if (request?.fmm_parent_id == null || string.IsNullOrWhiteSpace(request?.fmm_parent_id)) throw new ArgumentNullException(nameof(request.fmm_parent_id));
            if (request?.fmm_sequence == null || string.IsNullOrWhiteSpace(request?.fmm_sequence)) throw new ArgumentNullException(nameof(request.fmm_sequence));
            if (request?.fmm_app_id == null || string.IsNullOrWhiteSpace(request?.fmm_app_id)) throw new ArgumentNullException(nameof(request.fmm_app_id));
            if (request?.created_user == null || string.IsNullOrWhiteSpace(request?.created_user)) throw new ArgumentNullException(nameof(request.created_user));
            if (request?.Active != "Y" && request?.Active != "N") throw new Exception(nameof(request.Active) + " is not valid");
            MSSQLResponse? dataResponse = await _commonRepo.FormMenuMasterInsert(request);
            return UserAdapter.MapFormMenuMasterSaveResponse(dataResponse);
        }
        #endregion

        #region For Common Actions Only:
        public async Task<ParentMenuResponse?> GetAllParentMenu(ParentMenuRequestDto request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetAllParentMenu(request);
            return UserAdapter.MapParentMenuResponse(dataResponse);
        }
        #endregion
    }
}
