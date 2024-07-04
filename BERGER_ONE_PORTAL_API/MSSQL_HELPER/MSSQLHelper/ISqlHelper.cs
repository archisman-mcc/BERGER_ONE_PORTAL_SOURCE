using MSSQL_HELPER.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace MSSQL_HELPER.MSSQLHelper;
public interface ISqlHelper
{
    Task<dynamic?> FetchData(ExecuteDataSetRequest request);
    Task<int> ExecuteNonQuery(ExecuteNonQueryRequest request);
}