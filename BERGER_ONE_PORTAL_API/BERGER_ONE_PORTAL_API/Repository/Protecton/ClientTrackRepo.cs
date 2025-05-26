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
    public class ClientTrackRepo: IClientTrackRepo
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        public ClientTrackRepo(ISqlHelper sqlHelper, IServiceContext serviceContext)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
        }

        public async Task<MSSQLResponse?> GetCTDealer(ClientTrackDealerRequestDto? request, string user_id)
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
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.app_id
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@user_group",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.user_group)
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
                    ParameterName = "@depot",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.depot)
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@terr",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.terr)
                };
                sqlParameters[6] = new SqlParameter
                {
                    ParameterName = "@dlr",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.dealer)
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[Service_User_Applicable_Dlr_Search]",
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

        public async Task<MSSQLResponse?> GetCTDetail(ClientTrackDetailRequestDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[4];

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
                    ParameterName = "@AsOnDate",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.asondate
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@repType",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.repType
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@client",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.client
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[Service_Client_Track]",
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

        public async Task<MSSQLResponse?> GetCTDetailTiger(ClientTrackTigerRequestDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[4];

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
                    ParameterName = "@AsOnDate",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.asondate
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@repType",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.repType
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@client",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.client
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[Service_Client_Track_Tiger]",
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

        public async Task<MSSQLResponse?> GetCTOtherDetail(ClientTrackOtherDetailRequestDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[4];

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
                    ParameterName = "@AsOnDate",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.asondate
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@repType",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.repType
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@client",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.client
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[Service_Client_Track_Other]",
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
