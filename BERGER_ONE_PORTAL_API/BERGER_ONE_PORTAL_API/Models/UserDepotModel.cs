using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserDepotModel
    {
        [JsonProperty("depot_code")]
        public string? DepotCode { get; set; }

        [JsonProperty("depot_name")]
        public string? DepotName { get; set; }
    }
}
