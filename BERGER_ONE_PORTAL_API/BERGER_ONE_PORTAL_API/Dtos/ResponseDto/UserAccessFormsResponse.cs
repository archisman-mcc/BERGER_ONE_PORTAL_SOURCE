using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class UserAccessFormsResponse
    {
        [JsonProperty("data")]
        public List<UserAccessFormsModel>? Data { get; set; }
    }

    public class UserAccessFormsSaveResponse
    {
        [JsonProperty("response_message")]
        public string? ResponseMessage { get; set; }
    }
}
