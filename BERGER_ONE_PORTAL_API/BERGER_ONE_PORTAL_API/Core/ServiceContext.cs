using BERGER_ONE_PORTAL_API.Common.Utilty;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.VisualBasic;
using MSSQL_HELPER.Model;
using System.Net.Sockets;
using System.Net;

namespace BERGER_ONE_PORTAL_API.Core;
public class ServiceContext: IServiceContext
{
    public ServiceContext(IConfiguration configuration)
    {
        if (configuration == null)
        {
            throw new ArgumentNullException("All DI parameters is required!");
        }
        Configuration = configuration;
        RequestTimeout = Convert.ToInt32(configuration["AppSettings:RequestTimeoutInSecond"]);
        MSSQLConnectionModel = new MSSQLConnectionModel()
        {
            ServerName = Convert.ToString(configuration.GetSection("DBCredential").GetValue(typeof(string), "DBServerName")),
            DataBaseName = Convert.ToString(configuration.GetSection("DBCredential").GetValue(typeof(string), "DBName")),
            UserId = Convert.ToString(configuration.GetSection("DBCredential").GetValue(typeof(string), "DBUserName")),
            Password = Convert.ToString(configuration.GetSection("DBCredential").GetValue(typeof(string), "DBPassword")),
            ConnectionRetryCount = 3,
            ConnectionRetryInterval = 2,
            ConnectionTimeout = 30
        };
    }
    public MSSQLConnectionModel MSSQLConnectionModel { get; set; }


    public IConfiguration Configuration { get; set; }
    public int RequestTimeout { get; set; }
}
