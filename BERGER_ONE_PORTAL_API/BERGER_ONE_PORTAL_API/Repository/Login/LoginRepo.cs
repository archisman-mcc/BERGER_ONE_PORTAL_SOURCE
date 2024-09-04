using BERGER_ONE_PORTAL_API.Core;
using BERGER_ONE_PORTAL_API.Dtos;
using MSSQL_HELPER.Model;
using MSSQL_HELPER.MSSQLHelper;
using Microsoft.Data.SqlClient;
using System.Data;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos;
using LoginRequestDto = BERGER_ONE_PORTAL_API.Dtos.LoginRequestDto;
using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Models;
using Microsoft.VisualBasic;

namespace BERGER_ONE_PORTAL_API.Repository.Login
{
    public class LoginRepo:ILoginRepo
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        public LoginRepo(ISqlHelper sqlHelper, IServiceContext serviceContext)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
        }
        public async Task<MSSQLResponse?> ValidateLogin(LoginRequestDto? request)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[4];

            sqlParams[0] = new SqlParameter
            {
                ParameterName = "@user_id",
                DbType = DbType.String,
                Direction = System.Data.ParameterDirection.Input,
                Size = -1,
                Value = request?.user_id
            };
            sqlParams[1] = new SqlParameter
            {
                ParameterName = "@password",
                DbType = DbType.String,
                Direction = System.Data.ParameterDirection.Input,
                Size = -1,
                Value = Encrypt.EncryptString(request?.password)
            };
            sqlParams[2] = new SqlParameter
            {
                ParameterName = "@outputCode",
                DbType = DbType.Int32,
                Size = -1,
                Direction = ParameterDirection.Output,
            };

            sqlParams[3] = new SqlParameter
            {
                ParameterName = "@outputMsg",
                DbType = DbType.String,
                Direction = ParameterDirection.Output,
                Size = -1,
            };
            response = new MSSQLResponse()
            {
                Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                {
                    CommandText = "[app].[validate_user_login]",
                    CommandTimeout = Constant.Common.SQLCommandTimeOut,
                    CommandType = CommandType.StoredProcedure,
                    ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                    IsMultipleTables = false,
                    Parameters = sqlParams
                }),
                RowsAffected = 0,
                OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
            };

            return response;
        }

        public async Task<MSSQLResponse> SaveRefreshToken(string username, string token)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[4];

            sqlParameters[0] = new SqlParameter
            {
                ParameterName = "@rt_user_id",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(username)
            };
            sqlParameters[1] = new SqlParameter
            {
                ParameterName = "@rt_app_portal",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = "PORTAL"
            };
            sqlParameters[2] = new SqlParameter
            {
                ParameterName = "@rt_roken",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(token)
            };
            sqlParameters[3] = new SqlParameter
            {
                ParameterName = "@rt_expiry_date",
                DbType = DbType.DateTime,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = DateTime.Now.AddDays(1).Date.AddSeconds(-1)
            };
            response = new MSSQLResponse()
            {
                RowsAffected = await _sqlHelper.ExecuteNonQuery(new ExecuteNonQueryRequest()
                {
                    CommandText = "app.insert_refresh_tokens",
                    CommandTimeout = BERGER_ONE_PORTAL_API.Common.Utilty.Constant.Common.SQLCommandTimeOut,
                    CommandType = CommandType.StoredProcedure,
                    ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                    Parameters = sqlParameters
                }),

            };
            return response;
        }

        public async Task<MSSQLResponse> ValidateRefreshToken(string username, string token)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[4];

            sqlParameters[0] = new SqlParameter
            {
                ParameterName = "@user_id",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(username)
            };
            sqlParameters[1] = new SqlParameter
            {
                ParameterName = "@app_portal",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = "PORTAL"
            };
            sqlParameters[2] = new SqlParameter
            {
                ParameterName = "@refresh_token",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(token)
            };
            sqlParameters[3] = new SqlParameter
            {
                ParameterName = "@isValid",
                DbType = DbType.Boolean,
                Direction = ParameterDirection.Output,
                Size = -1,
            };
            response = new MSSQLResponse()
            {
                Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                {
                    CommandText = "app.validate_refresh_token",
                    CommandTimeout = BERGER_ONE_PORTAL_API.Common.Utilty.Constant.Common.SQLCommandTimeOut,
                    CommandType = CommandType.StoredProcedure,
                    ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                    Parameters = sqlParameters
                }),
                OutputParameters = sqlParameters.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()

            };
            return response;
        }

        public async Task<MSSQLResponse> ValidateRefreshTokenV1(string username, string token)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[2];

            sqlParameters[0] = new SqlParameter
            {
                ParameterName = "@user_id",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(username)
            };
            sqlParameters[1] = new SqlParameter
            {
                ParameterName = "@isValid",
                DbType = DbType.Boolean,
                Direction = ParameterDirection.Output,
                Size = -1,
            };
            response = new MSSQLResponse()
            {
                Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                {
                    CommandText = "app.validate_refresh_token_vr1",
                    CommandTimeout = BERGER_ONE_PORTAL_API.Common.Utilty.Constant.Common.SQLCommandTimeOut,
                    CommandType = CommandType.StoredProcedure,
                    ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                    Parameters = sqlParameters
                }),
                OutputParameters = sqlParameters.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
            };
            return response;
        }

        public async Task<MSSQLResponse> ValidateRefreshTokenIsExpire(string username)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[3];

            sqlParameters[0] = new SqlParameter
            {
                ParameterName = "@user_id",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = Utils.IIFStringOrDBNull(username)
            };
            sqlParameters[1] = new SqlParameter
            {
                ParameterName = "@app_portal",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = "PORTAL"
            };
            sqlParameters[2] = new SqlParameter
            {
                ParameterName = "@isExpired",
                SqlDbType = SqlDbType.Char,
                Direction = ParameterDirection.Output,
                Size = -1,
            };
            response = new MSSQLResponse()
            {
                Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                {
                    CommandText = "app.validate_refresh_token_isexpired",
                    CommandTimeout = BERGER_ONE_PORTAL_API.Common.Utilty.Constant.Common.SQLCommandTimeOut,
                    CommandType = CommandType.StoredProcedure,
                    ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                    Parameters = sqlParameters
                }),
                OutputParameters = sqlParameters.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
            };
            return response;
        }

        #region "Other"
        public async Task<MSSQLResponse> GetUserApplicableMenu(string UserId, string UserGroup)
        {
            MSSQLResponse? response = null;
            var sqlParams = new SqlParameter[2];

            sqlParams[0] = new SqlParameter
            {
                ParameterName = "@logingrpid",
                SqlDbType = SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Input,
                Size = -1,
                Value = UserGroup
            };
            sqlParams[1] = new SqlParameter
            {
                ParameterName = "@loginuserid",
                SqlDbType = SqlDbType.VarChar,
                Direction = System.Data.ParameterDirection.Input,
                Size = -1,
                Value = UserId
            };

            response = new MSSQLResponse()
            {
                Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                {
                    CommandText = "[dbo].[LoginUserAccessForms_Get]",
                    CommandTimeout = Constant.Common.SQLCommandTimeOut,
                    CommandType = CommandType.StoredProcedure,
                    ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                    IsMultipleTables = false,
                    Parameters = sqlParams
                }),
                RowsAffected = null,
                OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
            };
            return response;
        }

        internal static List<UserApplicableMenuModel>? MapUserApplicableMenu(DataTable? dt)
        {
            var data = new List<UserApplicableMenuModel>();
            if (dt != null && dt.Rows.Count > 0)
            {
                data = dt.AsEnumerable()?.Where(nav => Convert.ToInt32(nav.Field<object>("fmm_parent_id")) == 0)?.Select(nav => new UserApplicableMenuModel
                {
                    form_id = Convert.ToInt32(nav.Field<object>("fmm_id")),
                    fafa_icon = Convert.ToString(nav.Field<object>("fmm_menu_icon")),
                    form_name = Convert.ToString(nav.Field<object>("fmm_name")),
                    form_link = Convert.ToString(nav.Field<object>("fmm_link")),
                    form_parent_id = Convert.ToInt32(nav.Field<object>("fmm_parent_id")),
                    form_seq = Convert.ToInt32(nav.Field<object>("fmm_sequence")),
                    Children = dt.AsEnumerable().Where(x => Convert.ToString(x.Field<object>("fmm_parent_id")).StringEquals(Convert.ToString(nav.Field<object>("fmm_id")), StringComparison.OrdinalIgnoreCase))?.Select(r => new UserApplicableMenuModel
                    {
                        form_id = Convert.ToInt32(r.Field<object>("fmm_id")),
                        form_name = Convert.ToString(r.Field<object>("fmm_name")),
                        form_link = Convert.ToString(r.Field<object>("fmm_link")),
                        form_parent_id = Convert.ToInt32(r.Field<object>("fmm_parent_id")),
                        fafa_icon = Convert.ToString(r.Field<object>("fmm_menu_icon")),
                        form_seq = Convert.ToInt32(r.Field<object>("fmm_sequence"))
                    })?.ToList(),
                }).DistinctBy(r => r.form_id)?.ToList();
            }
            return data;
        }
        #endregion
    }

}
