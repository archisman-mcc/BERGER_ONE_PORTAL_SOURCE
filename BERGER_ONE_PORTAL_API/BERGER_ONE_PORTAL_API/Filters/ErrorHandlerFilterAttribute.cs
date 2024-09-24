using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Net;
using Microsoft.AspNetCore.Http.Extensions;
using System.Text;
using BERGER_ONE_PORTAL_API.Exceptions;
using BERGER_ONE_PORTAL_API.Models;
using BERGER_ONE_PORTAL_API.Repository.Logger;
using Newtonsoft.Json;
// ReSharper disable MustUseReturnValue

namespace BERGER_ONE_PORTAL_API.Filters
{
    public class ErrorHandlerFilterAttribute(ILoggerService loggerService) : ExceptionFilterAttribute
    {
        public override async void OnException(ExceptionContext context)
        {
            context.ExceptionHandled = true;
            if (context.Exception is SqlException se1)
            {
                context.Result = new ObjectResult(new ResponseDto<dynamic>()
                {
                    success = false,
                    statusCode = HttpStatusCode.NoContent,
                    ErrorCode = StatusCodes.Status400BadRequest,
                    message = se1.Message
                })
                {
                    StatusCode = StatusCodes.Status200OK
                };
            }
            else if (context.Exception is AggregateException ae &&
                 ae.InnerExceptions.FirstOrDefault(c => c is SqlException) is SqlException { Number: >= 50000 } se)
            {
                context.Result = new ObjectResult(new ResponseDto<dynamic>()
                {
                    success = false,
                    statusCode = HttpStatusCode.NoContent,
                    ErrorCode = StatusCodes.Status400BadRequest,
                    message = se.Message
                })
                {
                    StatusCode = StatusCodes.Status200OK
                };
            }
            else if (context.Exception is CustomException ce)
            {
                context.Result = new ObjectResult(new ResponseDto<dynamic>()
                {
                    success = false,
                    statusCode = HttpStatusCode.NoContent,
                    ErrorCode = StatusCodes.Status400BadRequest,
                    message = ce.Message
                })
                {
                    StatusCode = StatusCodes.Status200OK
                };
            }
            else
            {
                var refNo = Guid.NewGuid().ToString().Split('-').LastOrDefault();
                var message = $"Something went wrong, Please try after sometime. ({refNo})";
                
                var responseDto = new ResponseDto<dynamic>
                {
                    success = false,
                    statusCode = HttpStatusCode.InternalServerError,
                    ErrorCode = StatusCodes.Status500InternalServerError,
                    message = message,
                    Data = new UnprocessableEntityObjectResult(context.ModelState).Value
                };

                loggerService.InsertExceptionLog(new ExceptionLogInsertModel
                {
                    LogRefNo = refNo,
                    ResponseContent = JsonConvert.SerializeObject(responseDto, Formatting.None),
                    RequestCurl = GenerateCurl(context.HttpContext.Request).Result,
                    ExceptionStackTrace = context.Exception.StackTrace
                }).Wait();

                context.Result = new ObjectResult(responseDto)
                {
                    StatusCode = StatusCodes.Status200OK
                };
                //context.Result = new JsonResult(new ResponseDto<string> { IsSuccess = false, Message = "Error", Data = context.Exception.Message });
            }
        }

        private async Task<string> GenerateCurl(HttpRequest request)
        {
            var curl = "curl \n";
            curl += $" --location '{request.GetDisplayUrl()}' \n";
            curl += request.Headers.Where(c => c.Value.Any(d => d != null))
                .Select(c => $" --header '{c.Key}: {c.Value.FirstOrDefault()}' \n")
                .Aggregate((s1, s2) => $"{s1}{s2}");
            if (request.Headers.All(c => c.Key != "Content-Type"))
            {
                curl += " --header 'Content-Type: application/json' \n";
            }
            if (await GetRequestBody(request) is {} content)
            {
                //var content = await request.Content.ReadAsStringAsync();
                if (!string.IsNullOrEmpty(content))
                    curl += $" --data '{content.Trim()}'";
            }
            return curl;
        }
        private async Task<string> GetRequestBody(HttpRequest request)
        {
            var requestBody = string.Empty;
            if (request.ContentLength > 0)
            {
                request.EnableBuffering();
                var buffer = new byte[Convert.ToInt32(request.ContentLength)];
                await request.Body.ReadAsync(buffer, 0, buffer.Length);
                requestBody = Encoding.UTF8.GetString(buffer);
                request.Body.Position = 0;
            }
            return requestBody;
        }
    }
}
