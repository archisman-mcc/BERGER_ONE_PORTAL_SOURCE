using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models.Protecton
{
    public class EpcaDealersModel
    {
        [JsonProperty("dealer_code")]
        public string? DealerCode { get; set; }

        [JsonProperty("dealer_name")]
        public string? DealerName { get; set; }
    }
}
