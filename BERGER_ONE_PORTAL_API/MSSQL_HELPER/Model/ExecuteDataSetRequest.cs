using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
namespace MSSQL_HELPER.Model;
public class ExecuteDataSetRequest
{
    public MSSQLConnectionModel? ConnectionProperties { get; set; }
    public string? CommandText { get; set; }
    public CommandType CommandType { get; set; }
    public int CommandTimeout { get; set; }
    public SqlParameter[]? Parameters { get; set; }
    public bool IsMultipleTables { get; set; }
}
