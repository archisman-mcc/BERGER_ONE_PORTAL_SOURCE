using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class UserAppRequestDto
    {
        [Required]
        [JsonProperty("user_id")]
        public string? user_id { get; set; }
        [JsonProperty("url")]
        public string? Url { get; set; }
    }
    public class UserApplicableMenuReqDto
    {
        [Required]
        public int? app_id { get; set; }
        [Required]
        public string? user_group { get; set; }
    }
    public class UserApplicableMenuReqModel
    {
        [Required]
        public string? user_id { get; set; }
        [Required]
        public string? user_group { get; set; }
        [Required]
        public int? app_id { get; set; }
    }
}
