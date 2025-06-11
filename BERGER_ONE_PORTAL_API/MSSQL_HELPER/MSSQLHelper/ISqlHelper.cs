using MSSQL_HELPER.Model;
using Microsoft.Data.SqlClient;

namespace MSSQL_HELPER.MSSQLHelper;
public interface ISqlHelper
{
    Task<dynamic?> FetchData(ExecuteDataSetRequest request);
    Task<int> ExecuteNonQuery(ExecuteNonQueryRequest request);
    SqlConnection CreateConnection(MSSQLConnectionModel connection);
}