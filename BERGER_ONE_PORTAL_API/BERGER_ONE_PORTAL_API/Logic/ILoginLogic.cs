using BERGER_ONE_PORTAL_API.Dtos;

namespace BERGER_ONE_PORTAL_API.Logic
{
    public interface ILoginLogic
    {
        Task<LoginResponseDto?> ValidateLogin(LoginRequestDto? request);
        Task<LoginResponseDto?> ValidateRefreshToken(string user_id, string refresh_token);
    }
}
