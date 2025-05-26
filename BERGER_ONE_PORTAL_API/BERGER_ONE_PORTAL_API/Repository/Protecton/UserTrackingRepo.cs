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
    public class UserTrackingRepo : IUserTrackingRepo
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        public UserTrackingRepo(ISqlHelper sqlHelper, IServiceContext serviceContext)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
        }

        public async Task<MSSQLResponse?> GetDSRRegn(UserTrackingRequestDto? request)
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
                    Value = request.SelectedUser
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Value = 15
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@AsOnDate",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.asOnDate
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@repType",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.repType
                };
                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@prd_grp",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = DBNull.Value,
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@report_grp_level",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = "REGION",
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[user_appl_dlr_sales]",
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

        public async Task<MSSQLResponse?> GetDSRRegnCat(DSRRegionCatRequestDto? request)
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
                    Value = request.SelectedUser
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Value = 15
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@AsOnDate",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.asOnDate
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@repType",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.repType
                };
                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@prd_grp",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = DBNull.Value,
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@report_grp_level",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = "REGION_CAT",
                };
                sqlParameters[6] = new SqlParameter
                {
                    ParameterName = "@regn",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = Utils.IIFStringOrDBNull(request.regn),
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[user_appl_dlr_sales]",
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

        public async Task<MSSQLResponse?> GetDSRRegnTiger(DSRRegionCatRequestDto? request)
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
                    Value = request.SelectedUser
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Value = 15
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@AsOnDate",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.asOnDate
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@repType",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.repType
                };
                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@prd_grp",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = DBNull.Value,
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@report_grp_level",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = "REGION_TIGER",
                };
                sqlParameters[6] = new SqlParameter
                {
                    ParameterName = "@regn",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = Utils.IIFStringOrDBNull(request.regn),
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[user_appl_dlr_sales]",
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

        public async Task<MSSQLResponse?> GetDSRRegnOther(DSRRegionCatRequestDto? request)
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
                    Value = request.SelectedUser
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@app_id",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Value = 15
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@AsOnDate",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.asOnDate
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@repType",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.repType
                };
                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@prd_grp",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = DBNull.Value,
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@report_grp_level",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = "REGION_OTHER",
                };
                sqlParameters[6] = new SqlParameter
                {
                    ParameterName = "@regn",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = Utils.IIFStringOrDBNull(request.regn),
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[user_appl_dlr_sales]",
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

        public async Task<MSSQLResponse?> GetHistory(GetHistoryRequestDto? request)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[2];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@userid",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.UserId
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@dt",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.Date
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[Service_DealerVisitPurpose_History_Location]",
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

        public async Task<MSSQLResponse?> GetUserCollectionList(UserCollectionListRequestDto? request)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[2];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.SelectedUser
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@AsOnDate",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.asOnDate
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[Service_User_Tracking_Collection_List]",
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

        public async Task<MSSQLResponse?> GetVisitHistoryUserwise(GetVisitHistoryUserwiseRequestDto? request, string rel_path)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[3];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.SelectedUser
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@AsOnDate",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.asOnDate
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@rel_path",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = rel_path
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[GetVisitHistoryUserwise]",
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

        public async Task<MSSQLResponse?> GetVisitHistoryLocation(GetVisitHistoryLocationRequestDto? request)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[2];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@user_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.SelectedUser
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@AsOnDate",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Value = request.asOnDate
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[GetVisitHistoryLocation]",
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
