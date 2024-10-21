using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class UserAccessFormsInserRequest
    {
        [JsonProperty("userGroup")]
        public string? UserGroup { get; set; }

        [JsonProperty("userid")]
        public string? UserId { get; set; }

        [JsonProperty("sourceType")]
        public string? SourceType { get; set; }

        [JsonProperty("appid")]
        public string? AppId { get; set; }

        [JsonProperty("created_user")]
        public string? created_user { get; set; }

        [JsonProperty("form_list_access")]
        public List<FormListAccessModel>? form_list_access { get; set; }
    }

    public class FormListAccessModel
    {
        [JsonProperty("parent_code")]
        public string? parent_code { get; set; }

        [JsonProperty("form_code")]
        public string? form_code { get; set; }
    }
}
