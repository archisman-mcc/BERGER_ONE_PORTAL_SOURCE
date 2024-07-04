using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class UserAppResponseDto:BaseResponse
    {
        [JsonProperty("data")]
        public dynamic? Data { get; set; }
    }
}
