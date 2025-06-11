using BERGER_ONE_PORTAL_API.Common;
using Newtonsoft.Json;
using System.Net;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class ResponseDto<T>: BaseResponse
    {
        [JsonProperty("data")]
        public T? Data { get; set; }
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
