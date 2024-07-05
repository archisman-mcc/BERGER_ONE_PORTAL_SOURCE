using BERGER_ONE_API.Dtos;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Logger
{
    public interface ILoggerService
    {
        public void Log(string message);
        public Task<MSSQLResponse?> InsertAPILog(ApiLogDBDto? apiLog);
        public Task<MSSQLResponse?> UpdateTime(long id, int secs);
    }
}
