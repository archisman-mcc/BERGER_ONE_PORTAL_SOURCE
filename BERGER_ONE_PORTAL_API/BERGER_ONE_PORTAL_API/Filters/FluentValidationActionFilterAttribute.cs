using BERGER_ONE_PORTAL_API.Dtos;
using FluentValidation;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace BERGER_ONE_PORTAL_API.Filters
{
    public class FluentValidationActionFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                // Retrieve the validator for the model type
                var validatorFactory = context.HttpContext.RequestServices.GetService(typeof(IValidatorFactory)) as IValidatorFactory;
                var validator = validatorFactory?.GetValidator(context.ActionDescriptor.Parameters.FirstOrDefault()?.ParameterType);

                if (validator != null)
                {
                    // Execute validation using FluentValidation
                    var validationContext = new ValidationContext<object>(context.ActionArguments.Values.FirstOrDefault());
                    var validationResult = validator.Validate(validationContext);


                    // Transfer FluentValidation errors to ModelState

                    foreach (var error in validationResult.Errors)
                    {
                        context.ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
                    }
                    ErrorResponseDto responseDto = new ErrorResponseDto();
                    responseDto.success = false;
                    responseDto.statusCode = System.Net.HttpStatusCode.UnprocessableEntity;
                    responseDto.ErrorCode = 422;
                    responseDto.message = "Error in provided input.";
                    responseDto.Data = validationResult.Errors;
                    context.Result = new JsonResult(responseDto);
                }
            }

            base.OnActionExecuting(context);
        }
    }
}
