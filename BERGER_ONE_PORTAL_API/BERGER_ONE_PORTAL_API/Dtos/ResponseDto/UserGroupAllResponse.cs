using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class UserGroupAllResponse
    {
        [JsonProperty("data")]
        public List<UserGroupAllModel>? Data { get; set; }
    }
}
