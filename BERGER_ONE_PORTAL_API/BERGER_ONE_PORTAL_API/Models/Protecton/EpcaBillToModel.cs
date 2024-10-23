using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models.Protecton
{
    public class EpcaBillToModel
    {
        [JsonProperty("bill_to")]
        public Decimal? bill_to { get; set; }

        [JsonProperty("bill_to_name")]
        public string? bill_to_name { get; set; }

        [JsonProperty("pd_appl_yn")]
        public string? pd_appl_yn { get; set; }

        [JsonProperty("project_appl_yn")]
        public string? project_appl_yn { get; set; }
    }
}
