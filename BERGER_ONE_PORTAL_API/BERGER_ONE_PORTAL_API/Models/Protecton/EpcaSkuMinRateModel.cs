using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models.Protecton
{
    public class EpcaSkuMinRateModel
    {
        [JsonProperty("smr_sku_code")]
        public string? smr_sku_code { get; set; }

        [JsonProperty("smr_packsize")]
        public Decimal? smr_packsize { get; set; }

        [JsonProperty("smr_min_rate")]
        public Decimal? smr_min_rate { get; set; }

        [JsonProperty("smr_rebate")]
        public Decimal? smr_rebate { get; set; }
    }
}
