using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserByGroupListModel
    {
        [JsonProperty("userid")]
        public string? UserId { get; set; }

        [JsonProperty("username")]
        public string? UserName { get; set; }
    }
}
