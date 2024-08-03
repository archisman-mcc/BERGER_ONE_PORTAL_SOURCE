using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class AllUserGroupModel
    {
        [JsonProperty("usp_group_code")]
        public string? UserGroupCode { get; set; }

        [JsonProperty("usp_group_desc")]
        public string? UserGroupDesc { get; set; }
    }
}
