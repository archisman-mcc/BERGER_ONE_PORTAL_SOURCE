using AutoMapper;
using BERGER_ONE_API.Dtos;
using BERGER_ONE_API.Extensions;
using BERGER_ONE_API.Filters;
using BERGER_ONE_API.Models;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Models;
using BERGER_ONE_PORTAL_API.Repository.Logger;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System.Diagnostics;

namespace BERGER_ONE_PORTAL_API.Filters
{
    public class APILogAttribute: ShortCircuitFilterAttribute
    {
        private Stopwatch? _timer = null;
        private string req_id = string.Empty;

        private readonly ILoggerService _LoggerService;
        private readonly IMapper _mapper;
        public APILogAttribute(ILoggerService LoggerService, IMapper mapper)
        {
            _LoggerService = LoggerService;
            _mapper = mapper;
        }

        public override async void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            if (context.Result == null && context.HttpContext.Request.Headers != null && context.HttpContext.Request.Headers["Authorization"] != "")
            {
                _timer = Stopwatch.StartNew();
                var actionName = context.ActionDescriptor.RouteValues["action"];
                var controllerName = context.ActionDescriptor.RouteValues["controller"];
                var parameters = JsonConvert.SerializeObject(context.ActionArguments);
                var route_url = context.HttpContext.Request.Path.Value;

                if (route_url != null)
                {
                    string? token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                    if (token != null)
                    {
                        var userDetails = JsonConvert.DeserializeObject<UserDetailsModel>(TokenExtensions.GetSubFromBearerToken(token));
                        string? user_id = userDetails?.user_id;

                        ApiLogDBModel apiLog = new ApiLogDBModel();
                        ApiLogDBDto apiLogDto = new ApiLogDBDto();
                        apiLog.al_params = parameters;
                        apiLog.al_action = actionName;
                        apiLog.al_controller = controllerName;
                        apiLog.al_time_taken = -1;
                        apiLog.al_url = route_url;
                        apiLog.al_user_id = user_id;

                        _mapper.Map(apiLog, apiLogDto);

                        MSSQLResponse? mSSQLResponse = await _LoggerService.InsertAPILog(apiLogDto);
                        if ((mSSQLResponse != null))
                        {
                            req_id = mSSQLResponse.OutputParameters?[0].Value.ToString();
                        }

                    }

                }
            }

        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {


            _timer?.Stop();
            if (req_id != null && req_id != string.Empty)
            {
                _LoggerService.UpdateTime(Int64.Parse(req_id), int.Parse((_timer.ElapsedMilliseconds / 1000).ToString()));
            }

            base.OnActionExecuted(context);
        }
    }
}
