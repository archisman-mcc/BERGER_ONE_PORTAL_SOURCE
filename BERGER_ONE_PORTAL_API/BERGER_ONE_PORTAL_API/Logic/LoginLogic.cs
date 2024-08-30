using System.Data;
using System.Net;
using BERGER_ONE_PORTAL_API.NotificationSender;
using Constant = BERGER_ONE_PORTAL_API.Common.Utilty.Constant;
using BERGER_ONE_PORTAL_API.Repository.JWT;

using BERGER_ONE_PORTAL_API.Dtos;
using BERGER_ONE_PORTAL_API.Repository.Login;
using BERGER_ONE_PORTAL_API.Models;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Logic
{
    public class LoginLogic : ILoginLogic
    {
        public ILoginRepo _loginRepo;
        private readonly IJwtManager _jwtManager;
        public LoginLogic(ILoginRepo loginRepo, IJwtManager jwtManager)
        {
            
            _loginRepo = loginRepo;
            _jwtManager = jwtManager;
        }
        public async Task<LoginResponseDto?> ValidateLogin(LoginRequestDto? request)
        {
            LoginResponseDto response = new LoginResponseDto();
           
            var dbResponse = await _loginRepo.ValidateLogin(request);
            if (dbResponse != null)
            {
                int outputCode = int.TryParse(Convert.ToString(dbResponse.OutputParameters?[0].Value), out _) ? Convert.ToInt32(dbResponse.OutputParameters?[0].Value) : -1;

                string? outputMsg = Convert.ToString(dbResponse.OutputParameters?[1].Value);

                var dt = dbResponse.Data as DataTable;
                if (outputCode > 0 && dt != null && dt.Rows.Count > 0)
                {
                    var usermapping = dt?.AsEnumerable().Select(dr => new UserDetailsModel()
                    {
                        user_id = Convert.ToString(dr["user_id"]),
                        first_name = Convert.ToString(dr["first_name"]),
                        last_name = Convert.ToString(dr["last_name"]),
                        mailid = Convert.ToString(dr["mailid"]),
                        mobile = Convert.ToString(dr["mobile"]),
                        group_code = Convert.ToString(dt.Rows[0]["usp_group_code"]),
                        group_desc = Convert.ToString(dt.Rows[0]["usp_group_desc"]),
                    })?.ToList().FirstOrDefault();

                    if (usermapping != null)
                    {
                        var menuData = await _loginRepo.GetUserApplicableMenu(Convert.ToString(dt.Rows[0]["user_id"]), Convert.ToString(dt.Rows[0]["usp_group_code"]));

                        if (usermapping != null && (menuData != null && menuData.Data.Rows.Count > 0)) usermapping.UserApplicableMenu = LoginRepo.MapUserApplicableMenu(menuData.Data as DataTable);

                        string? token = _jwtManager.GenerateToken(usermapping, Constant.Common.JWTTokenExpiryMinsPortal);
                        string? refresh_token = _jwtManager.GenerateRefreshToken();
                        var mSSQLResponse = await _loginRepo.SaveRefreshToken(usermapping.user_id, refresh_token);
                        if (!string.IsNullOrWhiteSpace(token) && (mSSQLResponse != null) && (mSSQLResponse.RowsAffected > 0))
                        {
                            response.Data = usermapping;
                            response.success = true;
                            response.message = outputMsg;
                            response.statusCode = HttpStatusCode.OK;
                            response.token = token;
                            response.refresh_token = refresh_token;
                        }
                    }
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = outputMsg;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = Constant.ResponseMsg.InvalidMobileNo;
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }

        public async Task<LoginResponseDto?> ValidateRefreshToken(string user_id, string RefreshToken)
        {
            LoginResponseDto response = new LoginResponseDto();

            var dbResponse = await _loginRepo.ValidateRefreshToken(user_id, RefreshToken);
            if (dbResponse != null)
            {
                bool outputCode = bool.TryParse(Convert.ToString(dbResponse.OutputParameters?[0].Value), out _) ? Convert.ToBoolean(dbResponse.OutputParameters?[0].Value) : false;

                var dt = dbResponse.Data as DataTable;
                if (outputCode  && dt != null && dt.Rows.Count > 0)
                {
                    var usermapping = dt?.AsEnumerable().Select(dr => new UserDetailsModel()
                    {
                        user_id = Convert.ToString(dr["user_id"]),
                        first_name = Convert.ToString(dr["first_name"]),
                        last_name = Convert.ToString(dr["last_name"]),
                        mailid = Convert.ToString(dr["mailid"]),
                        mobile = Convert.ToString(dr["mobile"]),
                    })?.ToList().FirstOrDefault();
                    if (usermapping != null)
                    {
                        string? token = _jwtManager.GenerateToken(usermapping, Constant.Common.JWTTokenExpiryMinsPortal);
                        string? refresh_token = _jwtManager.GenerateRefreshToken();
                        var mSSQLResponse = await _loginRepo.SaveRefreshToken(usermapping.user_id, refresh_token);
                        if (!string.IsNullOrWhiteSpace(token) && (mSSQLResponse != null) && (mSSQLResponse.RowsAffected > 0))
                        {
                            response.Data = null;
                            response.success = true;
                            response.message = Constant.ResponseMsg.Success;
                            response.statusCode = HttpStatusCode.OK;
                            response.token = token;
                            response.refresh_token = refresh_token;
                        }
                    }
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = Constant.ResponseMsg.UnAuthorized;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = Constant.ResponseMsg.UnAuthorized;
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }

        public async Task<LoginResponseDto?> ValidateRefreshTokenV1(string user_id, string RefreshToken)
        {
            LoginResponseDto response = new LoginResponseDto();

            var dbResponse = await _loginRepo.ValidateRefreshTokenV1(user_id, RefreshToken);
            if (dbResponse != null)
            {
                bool outputCode = bool.TryParse(Convert.ToString(dbResponse.OutputParameters?[0].Value), out _) ? Convert.ToBoolean(dbResponse.OutputParameters?[0].Value) : false;

                var dt = dbResponse.Data as DataTable;
                if (outputCode && dt != null && dt.Rows.Count > 0)
                {
                    var usermapping = dt?.AsEnumerable().Select(dr => new UserDetailsModel()
                    {
                        user_id = Convert.ToString(dr["user_id"]),
                        first_name = Convert.ToString(dr["first_name"]),
                        last_name = Convert.ToString(dr["last_name"]),
                        mailid = Convert.ToString(dr["mailid"]),
                        mobile = Convert.ToString(dr["mobile"]),
                        group_code = Convert.ToString(dt.Rows[0]["usp_group_code"]),
                        group_desc = Convert.ToString(dt.Rows[0]["usp_group_desc"]),
                    })?.ToList().FirstOrDefault();
                    if (usermapping != null)
                    {
                        var menuData = await _loginRepo.GetUserApplicableMenu(Convert.ToString(dt.Rows[0]["user_id"]), Convert.ToString(dt.Rows[0]["usp_group_code"]));

                        if (usermapping != null && (menuData != null && menuData.Data.Rows.Count > 0)) usermapping.UserApplicableMenu = LoginRepo.MapUserApplicableMenu(menuData.Data as DataTable);

                        string? token = _jwtManager.GenerateToken(usermapping, Constant.Common.JWTTokenExpiryMinsPortal);
                        string? refresh_token = _jwtManager.GenerateRefreshToken();
                        var mSSQLResponse = await _loginRepo.SaveRefreshToken(usermapping.user_id, refresh_token);
                        if (!string.IsNullOrWhiteSpace(token) && (mSSQLResponse != null) && (mSSQLResponse.RowsAffected > 0))
                        {
                            response.Data = usermapping;
                            response.success = true;
                            response.message = Constant.ResponseMsg.Success;
                            response.statusCode = HttpStatusCode.OK;
                            response.token = token;
                            response.refresh_token = refresh_token;
                        }
                    }
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = Constant.ResponseMsg.UnAuthorized;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = Constant.ResponseMsg.UnAuthorized;
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }
    }
}
