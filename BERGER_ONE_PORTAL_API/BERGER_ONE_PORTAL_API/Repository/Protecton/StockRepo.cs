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
    public class StockRepo : IStockRepo
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        public StockRepo(ISqlHelper sqlHelper, IServiceContext serviceContext)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
        }

        public async Task<MSSQLResponse?> GetPrdList(StockProductRequestDto? request, string user_id)
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
                    Size = -1,
                    Value = user_id
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@prd_desc",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.prd_desc
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[Service_STK_PrdList]",
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
    
        public async Task<MSSQLResponse?> GetShdList(StockShadeRequestDto? request, string user_id)
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
                    Size = -1,
                    Value = user_id
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@prd_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.prd_code
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@shd_desc",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.shd_desc)
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[Service_STK_ShdList]",
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
    
        public async Task<MSSQLResponse?> GetSkuList(StockSkuListRequestDto? request, string user_id)
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
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.app_id
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@regn",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.regn)
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@depot",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.depot)
                };
                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@prd_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.prd_code)
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@shd_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.shd_code)
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[Service_STK_SkuList]",
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
    
        public async Task<MSSQLResponse?> GetActionCatList(string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[1];

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
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[get_action_cat_list]",
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

        public async Task<MSSQLResponse?> GetActionRcList(ActionRcListDto? request, string user_id)
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
                    ParameterName = "@days",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(request.days)
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
                        CommandText = "[protecton].[get_action_rc_list]",
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
        
        public async Task<MSSQLResponse?> ActionDefaulterList(ActionDefaulterListDto? request, string user_id)
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
                    ParameterName = "@cat",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.cat)
                };

                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@top",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(request.top)
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
                sqlParameters[6] = new SqlParameter
                {
                    ParameterName = "@slab",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(request.slab)
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[get_action_defaulter_list]",
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

        public async Task<MSSQLResponse?> GetReqList(StockReqListRequestDto? request, string user_id)
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
                    ParameterName = "@app_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = request.app_id
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@depot",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.depot)
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@sku_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.sku_code)
                };

                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[Service_STK_ReqList]",
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
