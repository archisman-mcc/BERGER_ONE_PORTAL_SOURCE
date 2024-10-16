using System.Net;
using BERGER_ONE_PORTAL_API.Repository.JWT;
using BERGER_ONE_PORTAL_API.Models;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using Newtonsoft.Json.Linq;
using BERGER_ONE_PORTAL_API.Repository.Common;
using BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse;
using BERGER_ONE_PORTAL_API.Common;
using Microsoft.IdentityModel.Tokens;

namespace BERGER_ONE_PORTAL_API.Logic
{
    public class CommonLogic : ICommonLogic
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

        public async Task<UserApplAppResponseDto?> GetApplicableAppList(UserApplAppRequestDto request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetApplicableAppList(request);
            return UserAdapter.MapUserApplAppResponse(dataResponse);
        }

        public async Task<AllUserGroupResponseDto?> GetAllUserGroupList(AllUserGroupRequestDto request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetAllUserGroupList(request);
            return UserAdapter.MapUserProfileGroupAllResponse(dataResponse);
        }

        public async Task<UserTerrResponseDto?> GetTerrDepotWise(UserTerrRequestDto request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetTerrDepotWise(request);
            return UserAdapter.MapUserTerrResponse(dataResponse);
        }

        public async Task<UserInsertResponseDto?> UserProfileInsert(UserInsertRequestDto request, string user_id)
        {
            if (request == null) throw new ArgumentNullException(nameof(request));
            if (request?.userId == null || string.IsNullOrWhiteSpace(request?.userId)) throw new ArgumentNullException(nameof(request.userId));
            if (request?.firstName == null || string.IsNullOrWhiteSpace(request?.firstName)) throw new ArgumentNullException(nameof(request.firstName));
            if (request?.employeeId == null || string.IsNullOrWhiteSpace(request?.employeeId)) throw new ArgumentNullException(nameof(request.employeeId));
            if (request?.department == null || string.IsNullOrWhiteSpace(request?.department)) throw new ArgumentNullException(nameof(request.department));
            if (request?.mobileNo == null || string.IsNullOrWhiteSpace(request?.mobileNo)) throw new ArgumentNullException(nameof(request.mobileNo));
            if (request?.designation == null || string.IsNullOrWhiteSpace(request?.designation)) throw new ArgumentNullException(nameof(request.designation));
            if (request?.depot == null || string.IsNullOrWhiteSpace(request?.depot)) throw new ArgumentNullException(nameof(request.depot));


            MSSQLResponse? dataResponse = await _commonRepo.UserProfileInsert(request, user_id);
            return UserAdapter.MapUserProfileInsertResponse(dataResponse);
        }

        public async Task<UserApplTerrResponseDto?> GetApplicableTerrList(UserApplTerrRequestDto request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetApplicableTerrList(request);
            return UserAdapter.MapUserApplTerrResponse(dataResponse);
        }

        #endregion

        #region For Form Menu Master:
        public async Task<FormMenuResponse?> FormMenuMasterList(FormMenuFetchRequestDto dto)
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
            if (request?.fafa_icon == null || string.IsNullOrWhiteSpace(request?.fafa_icon)) throw new ArgumentNullException(nameof(request.created_user));
            if (request?.created_user == null || string.IsNullOrWhiteSpace(request?.created_user)) throw new ArgumentNullException(nameof(request.created_user));
            if (request?.Active != "Y" && request?.Active != "N") throw new Exception(nameof(request.Active) + " is not valid");
            MSSQLResponse? dataResponse = await _commonRepo.FormMenuMasterInsert(request);
            return UserAdapter.MapFormMenuMasterSaveResponse(dataResponse);
        }
        #endregion

        #region For User Form Access:
        public async Task<UserAccessFormsResponse?> GetUserApplicableForms(UserAccessFormsRequest request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetUserApplicableForms(request);
            return UserAdapter.MapUserApplicableResponse(dataResponse);
        }
        public async Task<UserAccessFormsResponse?> GetUserAvailableForms(UserAccessFormsRequest request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetUserAvailableForms(request);
            return UserAdapter.MapUserAvailableResponse(dataResponse);
        }
        public async Task<UserAccessFormsSaveResponse?> UserFormAccessInsert(UserAccessFormsInserRequest request)
        {
            if (request == null) throw new ArgumentNullException(nameof(request));
            if (request?.form_list_access == null || request?.form_list_access.Count == 0) throw new ArgumentNullException(nameof(request.form_list_access));
            if (request?.UserId == null || string.IsNullOrWhiteSpace(request?.UserId)) throw new ArgumentNullException(nameof(request.UserId));
            if (request?.UserGroup == null || string.IsNullOrWhiteSpace(request?.UserGroup)) throw new ArgumentNullException(nameof(request.UserGroup));
            if (request?.created_user == null || string.IsNullOrWhiteSpace(request?.created_user)) throw new ArgumentNullException(nameof(request.created_user));
            MSSQLResponse? dataResponse = await _commonRepo.UserFormAccessInsert(request);
            return UserAdapter.MapUserAccessSaveResponse(dataResponse);
        }
        #endregion

        #region For Common Actions Only:
        public async Task<ParentMenuResponse?> GetAllParentMenu(ParentMenuRequestDto request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetAllParentMenu(request);
            return UserAdapter.MapParentMenuResponse(dataResponse);
        }

        public async Task<UserGroupAllResponse?> GetAllUserGroup(UserGroupAllRequest request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetAllUserGroup(request);
            return UserAdapter.MapUserGroupAllResponse(dataResponse);
        }
        public async Task<UserByGroupResponse?> GetUserListByGroup(UserByGroupRequest request)
        {
            MSSQLResponse? dataResponse = await _commonRepo.GetUserListByGroup(request);
            return UserAdapter.MapUserListByGroupResponse(dataResponse);
        }
        #endregion

        #region For Password Encrypt & Decrypt:
        public Task<PwdEncryptDecryptResponse?> PasswordEncryptDecrypt(PwdEncryptDecryptRequest request)
        {
            PwdEncryptDecryptResponse? response = null;
            string psw = string.Empty;

            if (string.IsNullOrEmpty(request.pwd_type)) throw new NullReferenceException(request.pwd_type);

            if (string.IsNullOrEmpty(request.input_password)) throw new NullReferenceException(request.input_password);
            if (request.pwd_type.ToUpper().Equals("ENCRYPT")) psw = Encrypt.EncryptString(request.input_password);
            else psw = Encrypt.DecryptString(request.input_password);
            if (!string.IsNullOrEmpty(psw))
            {
                response = new PwdEncryptDecryptResponse()
                {
                    Data = new PwdEncryptDecryptModel()
                    {
                        OutputPassword = psw
                    }
                };
            }
            return Task.FromResult(response);
        }

        public Task<DynamicResponse?> ValidateIFSC(CommonRequestDto dto)
        {
            DynamicResponse? response = new DynamicResponse();
            if (!string.IsNullOrWhiteSpace(dto.common_request))
            {
                if (string.IsNullOrEmpty(dto.common_request)) throw new NullReferenceException(dto.common_request);
                if (!string.IsNullOrEmpty(dto.common_request))
                {
                    string url = "http://ifsc.razorpay.com/" + dto.common_request;
                    try
                    {
                        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                        request.Method = "GET";

                        using (HttpWebResponse httpResponse = (HttpWebResponse)request.GetResponse())
                        {
                            if (httpResponse.StatusCode == HttpStatusCode.OK)
                            {
                                using (StreamReader reader = new StreamReader(httpResponse.GetResponseStream()))
                                {
                                    string responseBody = reader.ReadToEnd();
                                    BankBranch? _entity = System.Text.Json.JsonSerializer.Deserialize<BankBranch>(responseBody);
                                    response.Data = _entity;
                                    if (response.Data != null)
                                    {
                                        response.success = true;
                                        response.message = "Valid IFSC.";
                                        response.statusCode = HttpStatusCode.OK;
                                    }
                                    else
                                    {
                                        response.Data = null;
                                        response.success = false;
                                        response.message = "Invalid IFSC!";
                                        response.statusCode = HttpStatusCode.NoContent;
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        response.Data = null;
                        response.success = false;
                        response.message = "Invalid IFSC!";
                        response.statusCode = HttpStatusCode.InternalServerError;
                    }
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = "IFSC code is mandatory!";
                response.statusCode = HttpStatusCode.NoContent;
            }

            return Task.FromResult(response);
        }
        #endregion
    }
}
