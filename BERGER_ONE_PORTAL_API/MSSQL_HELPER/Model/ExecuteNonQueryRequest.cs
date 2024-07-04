using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace MSSQL_HELPER.Model;
public class ExecuteNonQueryRequest
{
    public MSSQLConnectionModel? ConnectionProperties { get; set; }
    public string? CommandText { get; set; }
    public CommandType CommandType { get; set; }
    public int CommandTimeout { get; set; }
    public IDbDataParameter[]? Parameters { get; set; }
}
