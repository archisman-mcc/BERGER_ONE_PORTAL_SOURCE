using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserDeptModel
    {
        [JsonProperty("lov_code")]
        public string? LovCode { get; set; }

        [JsonProperty("lov_value")]
        public string? LovName { get; set; }
    }
}
