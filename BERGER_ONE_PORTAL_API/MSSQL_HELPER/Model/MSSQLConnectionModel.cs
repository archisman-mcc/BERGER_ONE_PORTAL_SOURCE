using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace MSSQL_HELPER.Model;
public class MSSQLConnectionModel
{
    public string? ServerName { get; set; }
    public string? DataBaseName { get; set; }
    public string? UserId { get; set; }
    public string? Password { get; set; }
    public int ConnectionTimeout { get; set; } = 0;
    public int ConnectionRetryCount { get; set; } = 1;
    public int ConnectionRetryInterval { get; set; } = 3;
}