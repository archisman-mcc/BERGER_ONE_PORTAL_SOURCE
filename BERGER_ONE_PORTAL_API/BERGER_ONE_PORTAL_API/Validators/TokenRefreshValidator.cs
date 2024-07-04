using FluentValidation;
using BERGER_ONE_PORTAL_API.Dtos;

namespace BERGER_ONE_PORTAL_API.Validators
{
    public class TokenRefreshValidator: AbstractValidator<TokenRefreshDto>
    {
        public TokenRefreshValidator()
        {
            RuleFor(x => x.RefreshToken).NotEmpty().WithMessage("Refresh token cannot be empty.");
        }
    }
}
