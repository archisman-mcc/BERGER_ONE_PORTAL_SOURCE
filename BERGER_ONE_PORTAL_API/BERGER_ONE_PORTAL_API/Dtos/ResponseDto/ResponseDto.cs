using BERGER_ONE_PORTAL_API.Common;
using System.Net;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class ResponseDto<T>
    {
        public bool? IsSuccess { get; set; } = true;
        public T? Data { get; set; }
        public string Message { get; set; } = Common.Utilty.Constant.ResponseMsg.Success;
        public int? ErrorCode { get; set; }
    }

    public class BaseResponse
    {
        [Newtonsoft.Json.JsonConverter(typeof(NumericHttpStatusCodeConverter))]
        public HttpStatusCode statusCode { get; set; }
        public string? message { get; set; }
        public bool success { get; set; }
    }
}
