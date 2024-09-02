using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos;

namespace BERGER_ONE_PORTAL_API.Repository.Login
{
    public interface ILoginRepo
    {
        Task<MSSQLResponse> SaveRefreshToken(string username, string token);
        Task<MSSQLResponse?> ValidateLogin(LoginRequestDto? request);
        Task<MSSQLResponse> ValidateRefreshToken(string username, string token);
        Task<MSSQLResponse> ValidateRefreshTokenV1(string username, string token);
        Task<MSSQLResponse> GetUserApplicableMenu(string UserId, string UserGroup); 
    }
}
