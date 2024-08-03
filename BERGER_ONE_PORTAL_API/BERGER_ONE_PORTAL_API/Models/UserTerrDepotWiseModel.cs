using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserTerrDepotWiseModel
    {
        [JsonProperty("terr_code")]
        public string? TerrCode { get; set; }

        [JsonProperty("terr")]
        public string? TerrtName { get; set; }
    }
}
