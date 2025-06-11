using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Core;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using MSSQL_HELPER.Model;
using MSSQL_HELPER.MSSQLHelper;
using System.Data;
using Microsoft.Data.SqlClient;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using Newtonsoft.Json;
using Microsoft.IdentityModel.Tokens;
//using System.Data.SqlClient;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public class LegalRepo : ILegalRepo
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        public LegalRepo(ISqlHelper sqlHelper, IServiceContext serviceContext)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
        }

        public async Task<MSSQLResponse?> GetLegalOutStandingApprovalList(LegalOutStandingRequestDto request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[16];
            try
            {
                sqlParams[0] = new SqlParameter
                {
                    ParameterName = "@sbl_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 10,
                    Value = Utils.IIFStringOrDBNull(request.SblCode)
                };

                sqlParams[1] = new SqlParameter
                {
                    ParameterName = "@commt_year",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 4,
                    Value = Utils.IIFStringOrDBNull(request.CommtYear)
                };

                sqlParams[2] = new SqlParameter
                {
                    ParameterName = "@commt_month",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 2,
                    Value = request.CommtMonth
                };

                sqlParams[3] = new SqlParameter
                {
                    ParameterName = "@depot_regn",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 2,
                    Value = Utils.IIFStringOrDBNull(request.DepotRegn)
                };

                sqlParams[4] = new SqlParameter
                {
                    ParameterName = "@depot_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 3,
                    Value = Utils.IIFStringOrDBNull(request.DepotCode)
                };

                sqlParams[5] = new SqlParameter
                {
                    ParameterName = "@dealer_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 20,
                    Value = Utils.IIFStringOrDBNull(request.DealerCode)
                };

                sqlParams[6] = new SqlParameter
                {
                    ParameterName = "@dealer_name",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 100,
                    Value = request.DealerName
                };

                sqlParams[7] = new SqlParameter
                {
                    ParameterName = "@dealer_catg",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 200,
                    Value = Utils.IIFStringOrDBNull(request.DealerCatg)
                };

                sqlParams[8] = new SqlParameter
                {
                    ParameterName = "@notice_yn",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 200,
                    Value = Utils.IIFStringOrDBNull(request.NoticeYn)
                };

                sqlParams[9] = new SqlParameter
                {
                    ParameterName = "@notice_yn_ho",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 200,
                    Value = Utils.IIFStringOrDBNull(request.NoticeYnHo)
                };

                sqlParams[10] = new SqlParameter
                {
                    ParameterName = "@legal_status",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 200,
                    Value = Utils.IIFStringOrDBNull(request.LegalStatus)
                };

                sqlParams[11] = new SqlParameter
                {
                    ParameterName = "@FromValue",
                    DbType = DbType.Decimal,
                    Direction = ParameterDirection.Input,
                    //Value = request.FromValue ?? (object)DBNull.Value
                    Value = request.FromValue
                };

                sqlParams[12] = new SqlParameter
                {
                    ParameterName = "@ToValue",
                    DbType = DbType.Decimal,
                    Direction = ParameterDirection.Input,
                    //Value = request.ToValue ?? (object)DBNull.Value
                    Value = !string.IsNullOrEmpty(request.ToValue.ToString()) || request.ToValue > 0 ? request.ToValue: Decimal.MaxValue
                };

                sqlParams[13] = new SqlParameter
                {
                    ParameterName = "@usp_user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 20,
                    Value = user_id
                };

                sqlParams[14] = new SqlParameter
                {
                    ParameterName = "@company",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 50,
                    Value = Utils.IIFStringOrDBNull(request.Company)
                };

                sqlParams[15] = new SqlParameter
                {
                    ParameterName = "@status_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = 200,
                    Value = Utils.IIFStringOrDBNull(request.StatusCode)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[BERGER_MOBILE_APP_DB].[dbo].[LegalOutstandingAction_getDealerDtls]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = true,
                        Parameters = sqlParams
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
                };
            }
            catch (Exception ex) { throw new Exception(ex.Message, ex); }
            return response;
        }

        public async Task<MSSQLResponse> GetLegalOutStandingApprovalList_V1(GetLegalOutStandingRequest request)
        {
            var sqlParams = Utils.ObjectToSqlParams(request);
            return new MSSQLResponse
            {
                Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest
                {
                    CommandText = "[BERGER_MOBILE_APP_DB].[dbo].[LegalOutstandingAction_getDealerDtls]",
                    CommandTimeout = Constant.Common.SQLCommandTimeOut,
                    CommandType = CommandType.StoredProcedure,
                    ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                    IsMultipleTables = true,
                    Parameters = (SqlParameter[])sqlParams.ToArray<IDbDataParameter>()
                }),

                RowsAffected = null,
                OutputParameters = sqlParams.Where(r => r.Direction == ParameterDirection.Output).ToArray()
            };
        }
    }
}
