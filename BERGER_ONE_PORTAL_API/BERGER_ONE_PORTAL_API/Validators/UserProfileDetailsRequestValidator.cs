using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using FluentValidation;

namespace BERGER_ONE_PORTAL_API.Validators
{
    public class UserProfileDetailsRequestValidator: AbstractValidator<UserProfileDetailsRequest>
    {
        public UserProfileDetailsRequestValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage("User ID is mandatory");
        }
    }
}
