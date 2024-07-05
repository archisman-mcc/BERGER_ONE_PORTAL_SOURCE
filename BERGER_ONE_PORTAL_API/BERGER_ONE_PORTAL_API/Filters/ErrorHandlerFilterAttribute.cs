using BERGER_ONE_PORTAL_API.Dtos;
using BERGER_ONE_PORTAL_API.Repository.Logger;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace BERGER_ONE_PORTAL_API.Filters
{
    public class ErrorHandlerFilterAttribute: ExceptionFilterAttribute
    {
        private readonly ILoggerService _LoggerService;
        public ErrorHandlerFilterAttribute(ILoggerService LoggerService)
        {
            _LoggerService = LoggerService;
        }
        public override void OnException(ExceptionContext context)
        {
            string message = $"\nAn error occurred in {context.ActionDescriptor.DisplayName}: {context.Exception.Message}";

            _LoggerService.Log(message);

            context.ExceptionHandled = true; // Mark exception as handled

            ErrorResponseDto responseDto = new ErrorResponseDto();
            responseDto.success = false;
            responseDto.statusCode = System.Net.HttpStatusCode.InternalServerError;
            responseDto.ErrorCode = 500;
            responseDto.message = message;
            responseDto.Data = new UnprocessableEntityObjectResult(context.ModelState).Value;
            context.Result = new JsonResult(responseDto);

            //context.Result = new JsonResult(new ResponseDto<string> { IsSuccess = false, Message = "Error", Data = context.Exception.Message });
        }
    }
}
