using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models.Protecton
{
    public class EpcaFactoryModel
    {
        [JsonProperty("org_code")]
        public string? org_code { get; set; }

        [JsonProperty("org_name")]
        public string? org_name { get; set; }
    }
}
