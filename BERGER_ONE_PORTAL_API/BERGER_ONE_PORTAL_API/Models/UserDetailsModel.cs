using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserDetailsModel
    {
        public string? user_id { get; set; }
        public string? first_name { get; set; }
        public string? last_name { get; set; }
        public string? mailid { get; set; }
        public string? mobile { get; set; }
        public string? profile_pic_url { get; set; }
        public string? group_code { get; set; }
        public string? group_desc { get; set; }

        public IEnumerable<UserApplicableMenuModel>? UserApplicableMenu { get; set; }
    }

    public class UserApplicableMenuModel
    {
        [JsonProperty("form_id")]
        public int form_id { get; set; }

        [JsonProperty("form_name")]
        public string? form_name { get; set; }

        [JsonProperty("form_link")]
        public string? form_link { get; set; }

        [JsonProperty("fafa_icon")]
        public string? fafa_icon { get; set; }

        [JsonProperty("form_parent_id")]
        public int form_parent_id { get; set; }

        [JsonProperty("form_seq")]
        public int form_seq { get; set; }

        [JsonProperty("children")]
        public List<UserApplicableMenuModel>? Children { get; set; }

    }
}
