using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class UserAccessFormsRequest
    {
        [JsonProperty("userId")]
        public string? UserId { get; set; }

        [JsonProperty("userGroup")]
        public string? UserGroup { get; set; }

        [JsonProperty("appId")]
        public int? appId { get; set; }

        [JsonProperty("globalFilter")]
        public string? GlobalFilter { get; set; }

        [JsonProperty("sourceType")]
        public string? SourceType { get; set; }
    }
}
