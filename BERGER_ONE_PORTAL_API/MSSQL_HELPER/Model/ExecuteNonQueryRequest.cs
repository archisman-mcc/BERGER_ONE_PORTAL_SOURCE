using System.Data;
using Microsoft.Data.SqlClient;

namespace MSSQL_HELPER.Model;
public class ExecuteNonQueryRequest
{
    public MSSQLConnectionModel? ConnectionProperties { get; set; }
    public string? CommandText { get; set; }
    public CommandType CommandType { get; set; }
    public int CommandTimeout { get; set; }
    public IDbDataParameter[]? Parameters { get; set; }
    public SqlTransaction? Transaction { get; set; }
}
