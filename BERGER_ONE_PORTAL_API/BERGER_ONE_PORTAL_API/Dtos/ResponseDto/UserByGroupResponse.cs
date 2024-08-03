using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class UserByGroupResponse
    {
        [JsonProperty("data")]
        public List<UserByGroupListModel>? Data { get; set; }
    }
}
