using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserApplTerrModel
    {
        [JsonProperty("terr_code")]
        public string? terr_code { get; set; }

        [JsonProperty("terr_name")]
        public string? terr_name { get; set; }
    }
}
