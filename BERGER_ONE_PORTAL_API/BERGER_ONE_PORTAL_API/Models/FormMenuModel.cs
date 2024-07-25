using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class FormMenuModel : BaseResponse
    {
        [JsonProperty("fmm_id")]
        public int? FmmId { get; set; }

        [JsonProperty("fmm_name")]
        public string? FmmName { get; set; }

        [JsonProperty("fmm_link")]
        public string? FmmLink { get; set; }

        [JsonProperty("fmm_parent_id")]
        public int? FmmParentId { get; set; }

        [JsonProperty("fmm_parent_name")]
        public string? FmmParentName { get; set; }

        [JsonProperty("fmm_sequence")]
        public string? FmmSequence { get; set; }

        [JsonProperty("fmm_app_id")]
        public string? FmmAppId { get; set; }

        [JsonProperty("fafa_icon")]
        public string? FafaIcon { get; set; }

        [JsonProperty("activedesc")]
        public string? ActiveDesc { get; set; }

        [JsonProperty("created_user")]
        public string? CreatedUser { get; set; }

        [JsonProperty("created_date")]
        public DateTime? CreatedDate { get; set; }

        [JsonProperty("active")]
        public string? Active { get; set; }
    }
}
