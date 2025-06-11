using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Core;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using Microsoft.Data.SqlClient;
using MSSQL_HELPER.Model;
using MSSQL_HELPER.MSSQLHelper;
using System.Data;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public class OSRepo: IOSRepo
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        public OSRepo(ISqlHelper sqlHelper, IServiceContext serviceContext)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
        }

        public async Task<MSSQLResponse?> UserApplOSDetails(GetOSRequestDtlsDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[6];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = user_id
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(request.app_id)
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@report_grp_level",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.report_grp_level)
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@regn",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.regn)
                };
                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@terr",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.terr)
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@cat",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.cat)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[user_appl_os_report_hdr]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = true,
                        Parameters = sqlParameters
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParameters.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
                };
            }
            catch (Exception ex) { throw new Exception(ex.Message, ex); }
            return response;
        }

        public async Task<MSSQLResponse?> UserApplDlrOSSingle(GetOSSingleSmryRequestDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[7];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = user_id
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(request.app_id)
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@report_grp_level",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.report_grp_level)
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@regn",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.regn)
                };
                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@terr",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.terr)
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@cat",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.cat)
                };
                sqlParameters[6] = new SqlParameter
                {
                    ParameterName = "@slab",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.slab)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[user_appl_os_report_details]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = true,
                        Parameters = sqlParameters
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParameters.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
                };
            }
            catch (Exception ex) { throw new Exception(ex.Message, ex); }
            return response;
        }

        public async Task<MSSQLResponse?> UserApplDlrOSTrx(GetTRXSmryRequestDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[7];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = user_id
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(request.app_id)
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@dlrcode",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.dlrcode)
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@regn",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.regn)
                };
                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@terr",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.terr)
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@cat",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.cat)
                };
                sqlParameters[6] = new SqlParameter
                {
                    ParameterName = "@slab",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.slab)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[user_appl_OS_Level_Trx]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = true,
                        Parameters = sqlParameters
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParameters.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
                };
            }
            catch (Exception ex) { throw new Exception(ex.Message, ex); }
            return response;
        }

        public async Task<MSSQLResponse?> ODbyDateList(ODbyDateListDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[6];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = user_id
                };

                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@cat",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.cat)
                };

                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@day",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(request.day)
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@region",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.region)
                };
                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@terr_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.terr_code)
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@depot_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.depot_code)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[get_odbydate_list]",
                        CommandTimeout = Constant.Common.SQLCommandTimeOut,
                        CommandType = CommandType.StoredProcedure,
                        ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                        IsMultipleTables = true,
                        Parameters = sqlParameters
                    }),
                    RowsAffected = null,
                    OutputParameters = sqlParameters.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
                };
            }
            catch (Exception ex) { throw new Exception(ex.Message, ex); }
            return response;
        }

    }
}
