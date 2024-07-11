
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse
{
    public class UserProfileResponse: BaseResponse
    {
        [JsonProperty("data")]
        public dynamic? Data { get; set; }
    }
    public class UserProfileSaveResponse
    {
        [JsonProperty("response_message")]
        public string? ResponseMessage { get; set; }
    }

    public class DynamicResponse : BaseResponse
    {
        [JsonProperty("data")]
        public dynamic? Data { get; set; }
    }
}
