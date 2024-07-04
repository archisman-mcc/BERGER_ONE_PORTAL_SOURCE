using Microsoft.Data.SqlClient;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class MSSQLResponse
    {
        public dynamic? Data { get; set; }
        public int? RowsAffected { get; set; }
        public SqlParameter[]? OutputParameters { get; set; }
    }
}
