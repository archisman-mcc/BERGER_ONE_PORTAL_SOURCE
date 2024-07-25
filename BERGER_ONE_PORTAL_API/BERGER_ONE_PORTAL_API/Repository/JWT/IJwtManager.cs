using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Models;
using System.Security.Claims;

namespace BERGER_ONE_PORTAL_API.Repository.JWT
{
    public interface IJwtManager
    {
        string? GenerateToken(UserDetailsModel user, int expireMinutes = 2);
        ClaimsPrincipal? GetPrincipal(string token);
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
        string GenerateRefreshToken();
    }
}
