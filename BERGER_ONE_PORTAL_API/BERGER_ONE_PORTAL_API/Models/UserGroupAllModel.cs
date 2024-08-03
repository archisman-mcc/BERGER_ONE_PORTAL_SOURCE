using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserGroupAllModel
    {
        [JsonProperty("usp_group_code")]
        public string? usp_group_code { get; set; }

        [JsonProperty("usp_group_desc")]
        public string? usp_group_desc { get; set; }
    }
}
