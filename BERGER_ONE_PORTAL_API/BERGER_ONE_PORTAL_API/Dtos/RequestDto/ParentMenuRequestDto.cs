using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class ParentMenuRequestDto
    {
        [JsonProperty("userId")]
        public string? UserId { get; set; }

        [JsonProperty("flag")]
        public string? Flag { get; set; }

        [JsonProperty("globalFilter")]
        public string? GlobalFilter { get; set; }
    }
}
