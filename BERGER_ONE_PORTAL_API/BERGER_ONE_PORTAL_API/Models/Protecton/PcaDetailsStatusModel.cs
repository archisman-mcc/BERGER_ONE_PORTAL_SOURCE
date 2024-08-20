using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models.Protecton
{
    public class PcaDetailsStatusModel
    {
        [JsonProperty("pd_auto_id")]
        public Decimal? pd_auto_id { get; set; }

        [JsonProperty("pd_status")]
        public string? pd_status { get; set; }
    }
}
