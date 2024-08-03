using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserApplAppModel
    {
        [JsonProperty("user_app_id")]
        public Int32? UserAppId { get; set; }

        [JsonProperty("user_app_name")]
        public string? UserAppName { get; set; }
    }
}
