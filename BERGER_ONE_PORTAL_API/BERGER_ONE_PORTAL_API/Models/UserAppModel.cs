using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserAppModel
    {
        [JsonProperty("oam_app_id")]
        public int? AppId { get; set; }

        [JsonProperty("oam_app_name")]
        public string? AppName { get; set; }

    }
}
