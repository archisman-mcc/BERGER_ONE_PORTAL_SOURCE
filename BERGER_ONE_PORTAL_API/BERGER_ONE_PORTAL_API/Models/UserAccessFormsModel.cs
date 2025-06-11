using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserAccessFormsModel
    {
        [JsonProperty("form_code")]
        public string? FormCode { get; set; }

        [JsonProperty("form_desc")]
        public string? FormDesc { get; set; }
    }
}
