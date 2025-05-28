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
    public class BillingRepo: IBillingRepo
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        public BillingRepo(ISqlHelper sqlHelper, IServiceContext serviceContext)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
        }

        public async Task<MSSQLResponse?> GetBillingList(GetBillingListRequestDto? request, string user_id)
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
                    Value = Utils.IIFStringOrDBNull(user_id)
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@depot_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.DepotCode)
                };

                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@terr_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.TerrCode)
                };

                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@search_key",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.SearchKey)
                };

                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@frm_date",
                    DbType = DbType.DateTime,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFDateTimeOrDBNull(request.FromDate)
                };

                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@to_date",
                    DbType = DbType.DateTime,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFDateTimeOrDBNull(request.ToDate)
                };
                sqlParameters[6] = new SqlParameter
                {
                    ParameterName = "@region",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.Region)
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_Billing_List]",
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

        public async Task<MSSQLResponse?> GetBillingDetails(GetBillingDetailsRequestDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[1];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@order_id",
                    DbType = DbType.Int64,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFLongOrDBNull(request.OrderId)
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_Billing_Details]",
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

        public async Task<MSSQLResponse?> GetBillingTLVBalance(GetBillingTLVBalanceRequestDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[4];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@depot_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.depot_code)
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@dealer_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.dealer_code)
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@bill_to",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.bill_to)
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@User_id",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(user_id)
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_Billing_Get_TLV_Balance]",
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

        public async Task<MSSQLResponse?> InsertBillingSKU(InsertBillingSKURequestDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[5];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@created_user",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(user_id)
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@bill_to_code",
                    DbType = DbType.Decimal,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFDecimalOrDBNull(request.bill_to_code)
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@project_id",
                    DbType = DbType.Int64,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFLongOrDBNull(request.project_id)
                };

                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@tbl",
                    SqlDbType = SqlDbType.Structured,
                    Direction = System.Data.ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.ToDataTable(request?.billing_sku)
                };

                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@hdr_id",
                    DbType = DbType.Int64,
                    Direction = ParameterDirection.Output,
                    Size = -1
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_Billing_Sku_Insert]",
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

        public async Task<MSSQLResponse?> SendBillingDetails(GetBillingDetailsRequestDto? request, string user_id)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParameters = new SqlParameter[2];

            try
            {
                sqlParameters[0] = new SqlParameter
                {
                    ParameterName = "@order_id",
                    DbType = DbType.Int64,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFLongOrDBNull(request.OrderId)
                };
                sqlParameters[1] = new SqlParameter
                {
                    ParameterName = "@created_user",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = user_id
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[PCA_Details_Billing_mail_details]",
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
