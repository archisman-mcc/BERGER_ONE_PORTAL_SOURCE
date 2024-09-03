using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models.Protecton
{
    public class EpcaStatusModel
    {
        [JsonProperty("lov_code")]
        public string? LovCode { get; set; }

        [JsonProperty("lov_value")]
        public string? LovValue { get; set; }

        [JsonProperty("lov_field1_value")]
        public string? LovField1Value { get; set; }

        [JsonProperty("lov_field2_value")]
        public string? LovField2Value { get; set; }
    }
}
