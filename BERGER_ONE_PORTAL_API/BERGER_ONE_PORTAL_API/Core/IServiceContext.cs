using MSSQL_HELPER.Model;
namespace BERGER_ONE_PORTAL_API.Core;
public interface IServiceContext
{
    IConfiguration Configuration { get; set; }
    MSSQLConnectionModel MSSQLConnectionModel { get; }
    int RequestTimeout { get; set; }
    IWebHostEnvironment CurrentEnvironment { get; }
}
