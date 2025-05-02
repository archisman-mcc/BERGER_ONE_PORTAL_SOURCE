using BERGER_ONE_PORTAL_API.Dtos;

namespace BERGER_ONE_PORTAL_API.Logic
{
    public interface ILoginLogic
    {
        Task<LoginResponseDto?> ValidateLogin(LoginRequestDto? request);
        Task<LoginResponseDto?> ValidateRefreshToken(string user_id, string refresh_token);
        Task<LoginResponseDto?> ValidateRefreshTokenV1(TokenRefreshDtoNew? tokenRefreshNewDto);
        Task<LoginResponseDto?> ValidateLoginVr1(LoginRequestDto? request);
		Task<LoginResponseDto?> ValidateRefreshTokenV2(TokenRefreshDtoNew? tokenRefreshNewDto);

	}
}
