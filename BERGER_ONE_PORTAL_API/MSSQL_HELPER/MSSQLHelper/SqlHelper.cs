using MSSQL_HELPER.Model;
using System.Data.Common;
using System.Data;
using Microsoft.Data.SqlClient;

namespace MSSQL_HELPER.MSSQLHelper;
public class SqlHelper:ISqlHelper
{
    public SqlConnection CreateConnection(MSSQLConnectionModel connection)
    {
        var connectionObject = new SqlConnection
        {
            ConnectionString = new SqlConnectionStringBuilder
            {
                DataSource = connection.ServerName,
                InitialCatalog = connection.DataBaseName,
                UserID = connection.UserId,
                Password = connection.Password,
                IntegratedSecurity = false,
                TrustServerCertificate = true,
                ConnectTimeout = connection.ConnectionTimeout,
                ConnectRetryCount = connection.ConnectionRetryCount,
                ConnectRetryInterval = connection.ConnectionRetryInterval,
            }.ConnectionString
        };
        return connectionObject;
    }

    private void CloseConnection(DbConnection connectionObject)
    {
        if(connectionObject!=null && (connectionObject.State!=ConnectionState.Broken || connectionObject.State!=ConnectionState.Closed))
        {
            connectionObject.Close();
        }
    }

    private async Task OpenConnectionAsync(SqlConnection connectionObject)
    {
        await connectionObject.OpenAsync();
    }

    public async Task<dynamic?> FetchData(ExecuteDataSetRequest? request)
    {
        if (request == null)
        {
            throw new ArgumentNullException(Constants.RequestIsNull);
        }

        if (request.ConnectionProperties == null)
        {
            throw new ArgumentNullException(Constants.DataBaseNameIsNull);
        }

        if (string.IsNullOrWhiteSpace(request.CommandText))
        {
            throw new ArgumentNullException(Constants.CommandTextIsNull);
        }

        if (request.IsMultipleTables)
        {
            return await FetchDataSet(request.ConnectionProperties, request.CommandText, request.CommandType, request.CommandTimeout, request.Parameters);
        }
        else
        {
            return await FetchDataTable(request.ConnectionProperties, request.CommandText, request.CommandType, request.CommandTimeout, request.Parameters);
        }
    }

    public async Task<DataTable> FetchDataTable(MSSQLConnectionModel connectionParams, string commandText, CommandType commandType, int commandTimeout, params SqlParameter[]? parameters)
    {
        var dt = new DataTable();
        using SqlConnection connectionObject = CreateConnection(connectionParams);
        try
        {
            using var commandObject = new SqlCommand(commandText, connectionObject);
            commandObject.CommandType = commandType;

            if (parameters != null && parameters.Length > 0)
            {
                commandObject.Parameters.AddRange(parameters);
            }

            commandObject.CommandTimeout = commandTimeout;

            using var adapterObject = new SqlDataAdapter(commandObject);

            await OpenConnectionAsync(connectionObject);

            await Task.Run(() =>
            {
                adapterObject.Fill(dt);
            });

        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        finally
        {
            CloseConnection(connectionObject);
        }

        return dt;
    }

    public async Task<DataSet> FetchDataSet(MSSQLConnectionModel connectionParams, string commandText, CommandType commandType, int commandTimeout, params SqlParameter[]? parameters)
    {
        var resultSet = new DataSet();
        using SqlConnection connectionObject = CreateConnection(connectionParams);
        try
        {
            using var commandObject = new SqlCommand(commandText, connectionObject);
            commandObject.CommandType = commandType;

            if (parameters != null && parameters.Length > 0)
            {
                commandObject.Parameters.AddRange(parameters);
            }

            commandObject.CommandTimeout = commandTimeout;

            using var adapterObject = new SqlDataAdapter(commandObject);

            await OpenConnectionAsync(connectionObject);

            await Task.Run(() =>
            {
                adapterObject.Fill(resultSet);
            });

        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
        finally
        {
            CloseConnection(connectionObject);
        }

        return resultSet;
    }

    public async Task<int> ExecuteNonQuery(ExecuteNonQueryRequest request)
    {
        if (request == null)
        {
            throw new ArgumentNullException(Constants.RequestIsNull);
        }

        if (request.ConnectionProperties == null)
        {
            throw new ArgumentNullException(Constants.ConnectionPropertiesIsNull);
        }
        else
        {
            if (string.IsNullOrWhiteSpace(request.ConnectionProperties.ServerName))
            {
                throw new ArgumentNullException(Constants.DBServerNameIsNull);
            }

            if (string.IsNullOrWhiteSpace(request.ConnectionProperties.DataBaseName))
            {
                throw new ArgumentNullException(Constants.DBNameIsNull);
            }

            if (string.IsNullOrWhiteSpace(request.ConnectionProperties.UserId))
            {
                throw new ArgumentNullException(Constants.DBUserIdIsNull);
            }

            if (string.IsNullOrWhiteSpace(request.ConnectionProperties.Password))
            {
                throw new ArgumentNullException(Constants.DBPasswordIsNull);
            }
        }

        if (string.IsNullOrWhiteSpace(request.CommandText))
        {
            throw new ArgumentNullException(Constants.CommandTextIsNull);
        }

        return await ExecuteNonQuery(request.ConnectionProperties, request.CommandText, request.CommandType, request.CommandTimeout, request.Parameters, request.Transaction);
    }

    private async Task<int> ExecuteNonQuery(MSSQLConnectionModel connectionParams, string commandText, CommandType commandType, int commandTimeout,  IDbDataParameter[]? parameters, SqlTransaction? transaction)
    {
        var numRowsAffected = 0;
        if(transaction==null)
        {
            using SqlConnection connectionObject = CreateConnection(connectionParams);
            try
            {
                using var commandObject = new SqlCommand(commandText, connectionObject);
                commandObject.CommandType = commandType;
                commandObject.CommandTimeout = commandTimeout;
                if (parameters != null && parameters.Length > 0)
                {
                    commandObject.Parameters.AddRange(parameters);
                }

                await OpenConnectionAsync(connectionObject);

                numRowsAffected = await commandObject.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                CloseConnection(connectionObject);
            }
        }
        else
        {
            var sqlConn = transaction.Connection;
            await using var commandObject = new SqlCommand(commandText, sqlConn, transaction);
            commandObject.CommandType = commandType;
            commandObject.CommandTimeout = commandTimeout;

            if (parameters != null && parameters.Length > 0)
            {
                commandObject.Parameters.AddRange(parameters);
            }

            if (sqlConn.State != ConnectionState.Open)
                sqlConn.Open();

            numRowsAffected = await commandObject.ExecuteNonQueryAsync();
        }

        return numRowsAffected;
    }
}
