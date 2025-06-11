using MSSQL_HELPER.Model;

namespace BERGER_ONE_PORTAL_API.Core;
public class ServiceContext: IServiceContext
{
    public ServiceContext(IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
    {
        Configuration = configuration ?? throw new ArgumentNullException("All DI parameters is required!");
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
        CurrentEnvironment = hostingEnvironment;
    }
    public MSSQLConnectionModel MSSQLConnectionModel { get; set; }


    public IConfiguration Configuration { get; set; }
    public int RequestTimeout { get; set; }

    public IWebHostEnvironment CurrentEnvironment { get; }
}
