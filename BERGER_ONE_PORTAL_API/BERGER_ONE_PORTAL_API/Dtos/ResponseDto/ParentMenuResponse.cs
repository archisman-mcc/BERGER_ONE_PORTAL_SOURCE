using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class ParentMenuResponse
    {
        [JsonProperty("data")]
        public List<ParentMenuModel>? Data { get; set; }
    }
}
