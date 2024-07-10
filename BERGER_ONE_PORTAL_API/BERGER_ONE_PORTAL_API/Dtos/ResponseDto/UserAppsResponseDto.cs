using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class UserAppsResponseDto:BaseResponse 
    {

            [JsonProperty("data")]
            public List<UserAppModel>? Data { get; set; }

    }
}
