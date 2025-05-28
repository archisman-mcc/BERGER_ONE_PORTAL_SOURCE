using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton
{
    public class UserTrackingResponseDto: BaseResponse
    {
        [JsonProperty("data")]
        public dynamic? Data { get; set; }
    }
}
