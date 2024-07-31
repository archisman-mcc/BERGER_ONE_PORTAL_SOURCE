using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class ParentMenuModel
    {
        [JsonProperty("fmm_parent_id")]
        public string? FmmParentId { get; set; }

        [JsonProperty("fmm_parent_name")]
        public string? FmmParentName { get; set; }
    }
}
