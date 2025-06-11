using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos
{
    public class LoginRequestDto
    {
        public string? user_id { get; set; }
        public string? password { get; set; }
    }
    public class LoginResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public dynamic? Data { get; set; }
        public string? token { get; set; }
        public string? refresh_token { get; set; }
    }
    public class DeviceRegResponseDto:BaseResponse
    {
        [JsonProperty("data")]
        public dynamic? Data { get; set; }
    }
    public class ErrorResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public dynamic? Data { get; set; }
        public int? ErrorCode { get; set; }
    }

    public class TokenRefreshDto
    {
        public string? RefreshToken { get; set; }
    }

    public class TokenRefreshDtoNew
    {
        public string? RefreshToken { get; set; }
        public string? user_id { get; set; }
    }
}
