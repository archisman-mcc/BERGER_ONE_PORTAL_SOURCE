using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class PwdEncryptDecryptModel
    {
        [JsonProperty("output_password")]
        public string? OutputPassword { get; set; }
    }
}
