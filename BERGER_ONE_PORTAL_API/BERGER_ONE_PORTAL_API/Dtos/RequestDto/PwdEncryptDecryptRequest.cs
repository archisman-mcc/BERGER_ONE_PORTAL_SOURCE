using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class PwdEncryptDecryptRequest
    {
        [JsonProperty("input_password")]
        public string? input_password { get; set; }

        [JsonProperty("pwd_type")]
        public string? pwd_type { get; set; }
    }

    public class CommonRequestDto
    {
        [JsonProperty("common_request")]
        public string? common_request { get; set; }
    }
}
