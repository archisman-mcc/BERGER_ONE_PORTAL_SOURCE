using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models.Protecton
{
    public class EpcaStatusModel
    {
        [JsonProperty("lov_code")]
        public string? LovCode { get; set; }

        [JsonProperty("lov_value")]
        public string? LovValue { get; set; }
    }
}
