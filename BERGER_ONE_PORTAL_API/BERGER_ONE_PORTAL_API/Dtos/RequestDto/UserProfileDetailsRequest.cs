using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class UserProfileDetailsRequest
    {
        [JsonProperty("user_id")]
        public string? UserId { get; set; }
    }
}
