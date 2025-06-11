using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class ReportingUserRequest
    {
        [JsonProperty("userId")]
        public string? UserId { get; set; }

        [JsonProperty("globalFilter")]
        public string? GlobalFilter { get; set; }
    }
}
