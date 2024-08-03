using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class FormMenuInsertRequestDto
    {
        [JsonProperty("fmm_id")]
        public string? fmm_id { get; set; }

        [JsonProperty("fmm_name")]
        public string? fmm_name { get; set; }

        [JsonProperty("fmm_link")]
        public string? fmm_link { get; set; }

        [JsonProperty("fmm_parent_id")]
        public string? fmm_parent_id { get; set; }

        [JsonProperty("fmm_sequence")]
        public string? fmm_sequence { get; set; }

        [JsonProperty("fafa_icon")]
        public string? fafa_icon { get; set; }

        [JsonProperty("created_user")]
        public string? created_user { get; set; }

        [JsonProperty("active")]
        public string? Active { get; set; }

        [JsonProperty("insert_update_flag")]
        public string? insert_update_flag { get; set; }

        [JsonProperty("page_type")]
        public string? page_type { get; set; }
    }
}
