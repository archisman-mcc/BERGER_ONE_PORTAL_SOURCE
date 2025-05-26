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
    public class InvoiceRepo : IInvoiceRepo
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        public InvoiceRepo(ISqlHelper sqlHelper, IServiceContext serviceContext)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
        }

        public async Task<MSSQLResponse?> GetInvoiceDetails(InvoiceDetailsRequestDto? request, string user_id)
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
                    ParameterName = "@region",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.region)
                };
                sqlParameters[2] = new SqlParameter
                {
                    ParameterName = "@depot_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.depot_code)
                };
                sqlParameters[3] = new SqlParameter
                {
                    ParameterName = "@terr_code",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.terr_code)
                };
                sqlParameters[4] = new SqlParameter
                {
                    ParameterName = "@days",
                    DbType = DbType.Int32,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFIntegerOrDBNull(request.days)
                };
                sqlParameters[5] = new SqlParameter
                {
                    ParameterName = "@rep_type",
                    DbType = DbType.String,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFStringOrDBNull(request.rep_type)
                };
                sqlParameters[6] = new SqlParameter
                {
                    ParameterName = "@trx_id",
                    DbType = DbType.Decimal,
                    Direction = ParameterDirection.Input,
                    Size = -1,
                    Value = Utils.IIFDecimalOrDBNull(request.trx_id)
                };
                response = new MSSQLResponse()
                {
                    Data = await _sqlHelper.FetchData(new ExecuteDataSetRequest()
                    {
                        CommandText = "[protecton].[service_inv_details]",
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
