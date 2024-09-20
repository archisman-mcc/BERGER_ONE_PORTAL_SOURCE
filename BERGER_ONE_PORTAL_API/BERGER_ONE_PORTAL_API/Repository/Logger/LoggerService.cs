using BERGER_ONE_API.Dtos;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Core;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using MSSQL_HELPER.Model;
using MSSQL_HELPER.MSSQLHelper;
using System.Data;
using BERGER_ONE_PORTAL_API.Models;
using Microsoft.Data.SqlClient;
using BERGER_ONE_PORTAL_API.Common;

namespace BERGER_ONE_PORTAL_API.Repository.Logger
{
    public class LoggerService:ILoggerService
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        private readonly ILogger<LoggerService> _logger;
        public LoggerService(ISqlHelper sqlHelper, IServiceContext serviceContext, ILogger<LoggerService> logger)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
            _logger = logger;
        }

        private async Task<MSSQLResponse> ExecuteNonQuery(string commandText,
            IReadOnlyCollection<SqlParameter> sqlParameters)
        {
            var noOfEffected = await _sqlHelper.ExecuteNonQuery(new ExecuteNonQueryRequest
            {
                CommandText = commandText,
                CommandTimeout = Constant.Common.SQLCommandTimeOut,
                CommandType = CommandType.StoredProcedure,
                ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                Parameters = sqlParameters.ToArray<IDbDataParameter>()
            });
            return new MSSQLResponse
            {
                Data = null,
                RowsAffected = noOfEffected,
                OutputParameters = sqlParameters
                    .Where(r => r.Direction is ParameterDirection.Output or ParameterDirection.InputOutput)
                    .ToArray()
            };
        }

        public void Log(string message)
        {
            _logger.LogError(message);
        }
        public async Task<MSSQLResponse?> InsertAPILog(ApiLogDBDto? apiLog)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[7];

            sqlParams[0] = new SqlParameter
            {
                ParameterName = "@al_params",
                DbType = DbType.String,
                Direction = System.Data.ParameterDirection.Input,
                Size = -1,
                Value = apiLog?.al_params
            };
            sqlParams[1] = new SqlParameter
            {
                ParameterName = "@al_url",
                DbType = DbType.String,
                Direction = System.Data.ParameterDirection.Input,
                Size = -1,
                Value = apiLog?.al_url
            };
            sqlParams[2] = new SqlParameter
            {
                ParameterName = "@al_controller",
                DbType = DbType.String,
                Direction = System.Data.ParameterDirection.Input,
                Size = -1,
                Value = apiLog?.al_controller
            };
            sqlParams[3] = new SqlParameter
            {
                ParameterName = "@al_time_taken",
                DbType = DbType.Int32,
                Size = -1,
                Direction = ParameterDirection.Input,
                Value = apiLog?.al_time_taken
            };

            sqlParams[4] = new SqlParameter
            {
                ParameterName = "@al_action",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = apiLog?.al_action
            };
            sqlParams[5] = new SqlParameter
            {
                ParameterName = "@al_user_id",
                DbType = DbType.String,
                Direction = ParameterDirection.Input,
                Size = -1,
                Value = apiLog?.al_user_id
            };
            sqlParams[6] = new SqlParameter
            {
                ParameterName = "@al_id",
                DbType = DbType.Int64,
                Direction = ParameterDirection.Output,
                Size = -1,
            };
            response = new MSSQLResponse()
            {
                RowsAffected = await _sqlHelper.ExecuteNonQuery(new ExecuteNonQueryRequest()
                {
                    CommandText = "[app].[api_log_insert]",
                    CommandTimeout = Constant.Common.SQLCommandTimeOut,
                    CommandType = CommandType.StoredProcedure,
                    ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                    Parameters = sqlParams
                }),
                Data = null,
                OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
            };
            return response;
        }

        public async Task<MSSQLResponse?> UpdateTime(long id, int secs)
        {
            MSSQLResponse? response = null;
            SqlParameter[] sqlParams = new SqlParameter[2];

            sqlParams[0] = new SqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int64,
                Direction = System.Data.ParameterDirection.Input,
                Size = -1,
                Value = id
            };
            sqlParams[1] = new SqlParameter
            {
                ParameterName = "@secs",
                DbType = DbType.Int32,
                Direction = System.Data.ParameterDirection.Input,
                Size = -1,
                Value = secs
            };
            response = new MSSQLResponse()
            {
                RowsAffected = await _sqlHelper.ExecuteNonQuery(new ExecuteNonQueryRequest()
                {
                    CommandText = "[app].[api_log_update_time_taken]",
                    CommandTimeout = Constant.Common.SQLCommandTimeOut,
                    CommandType = CommandType.StoredProcedure,
                    ConnectionProperties = _serviceContext.MSSQLConnectionModel,
                    Parameters = sqlParams
                }),
                Data = null,
                OutputParameters = sqlParams.AsEnumerable().Where(r => r.Direction == ParameterDirection.Output)?.ToArray()
            };
            return response;
        }

        public Task<MSSQLResponse> InsertExceptionLog(ExceptionLogInsertModel requestModel)
        {
            return ExecuteNonQuery("ONE_APP.app.exception_log_insert", Utils.ObjectToSqlParams(requestModel));
        }
    }
}

