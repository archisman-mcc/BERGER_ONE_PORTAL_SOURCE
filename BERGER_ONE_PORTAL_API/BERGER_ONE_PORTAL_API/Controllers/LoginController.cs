using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BERGER_ONE_PORTAL_API.Dtos;
using BERGER_ONE_PORTAL_API.Logic;
using BERGER_ONE_PORTAL_API.Filters;
using System.Security.Claims;

namespace BERGER_ONE_PORTAL_API.Controllers
{
    [Route(Constant.Common.PortalAPIPrefix + "[controller]/[action]")]
    [ApiController]
    //[Authorize]
    [ServiceFilter(typeof(FluentValidationActionFilterAttribute))]
    [ServiceFilter(typeof(ErrorHandlerFilterAttribute))]
    [ServiceFilter(typeof(APILogAttribute))]

    public class LoginController : ControllerBase
    {
        private readonly ILoginLogic _loginLogic;

        public LoginController(ILoginLogic loginLogic)
        {
            _loginLogic = loginLogic;
        }

        [Authorize]
        [AllowAnonymous]
        [HttpGet]
        public async Task<LoginResponseDto?> Login([FromQuery] LoginRequestDto requestDto) => await _loginLogic.ValidateLogin(requestDto);

        [AllowAnonymous]
        [HttpGet]
        public async Task<LoginResponseDto?> RefreshToken([FromQuery] TokenRefreshDto? tokenRefreshDto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _loginLogic.ValidateRefreshToken(userDetails.user_id, tokenRefreshDto.RefreshToken);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<LoginResponseDto?> RefreshTokenV1([FromQuery] TokenRefreshDtoNew? tokenRefreshNewDto) => await _loginLogic.ValidateRefreshTokenV1(tokenRefreshNewDto);

        [HttpGet]
        public string ProtectedResource()
        {
            return "Success";
        }
    }
}
