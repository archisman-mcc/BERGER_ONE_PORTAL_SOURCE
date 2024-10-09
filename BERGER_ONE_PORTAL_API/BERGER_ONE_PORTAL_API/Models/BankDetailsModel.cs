using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class BankDetailsModel
    {
        [JsonProperty("BRANCH")]
        public string? BRANCH { get; set; }

        [JsonProperty("CENTRE")]
        public string? CENTRE { get; set; }

        [JsonProperty("DISTRICT")]
        public string? DISTRICT { get; set; }

        [JsonProperty("STATE")]
        public string? STATE { get; set; }

        [JsonProperty("ADDRESS")]
        public string? ADDRESS { get; set; }

        [JsonProperty("CONTACT")]
        public string? CONTACT { get; set; }

        [JsonProperty("IMPS")]
        public string? IMPS { get; set; }

        [JsonProperty("CITY")]
        public string? CITY { get; set; }

        [JsonProperty("UPI")]
        public Boolean? UPI { get; set; }

        [JsonProperty("MICR")]
        public string? MICR { get; set; }

        [JsonProperty("RTGS")]
        public Boolean? RTGS { get; set; }

        [JsonProperty("NEFT")]
        public Boolean? NEFT { get; set; }

        [JsonProperty("BANK")]
        public string? BANK { get; set; }

        [JsonProperty("BANKCODE")]
        public string? BANKCODE { get; set; }

        [JsonProperty("IFSC")]
        public string? IFSC { get; set; }
    }

    public class BankBranch
    {
        public string? MICR { get; set; }
        public string? BRANCH { get; set; }
        public string? ADDRESS { get; set; }
        public string? STATE { get; set; }
        public string? CONTACT { get; set; }
        public bool UPI { get; set; }
        public bool RTGS { get; set; }
        public string? CITY { get; set; }
        public string? CENTRE { get; set; }
        public string? DISTRICT { get; set; }
        public bool NEFT { get; set; }
        public bool IMPS { get; set; }
        public string? SWIFT { get; set; }
        public string? ISO3166 { get; set; }
        public string? BANK { get; set; }
        public string? BANKCODE { get; set; }
        public string? IFSC { get; set; }
    }
}
