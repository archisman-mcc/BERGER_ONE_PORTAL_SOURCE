using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class ReminderResponse:BaseResponse
    {
        public dynamic? Data { get; set; }
    }
    public class FinYesrResponse:BaseResponse
    {
        public dynamic? Data { get; set; }
    }
    public class PromotionalMsgResponseDto:BaseResponse
    {
        public dynamic? Data { get; set; }
    }
    public class GetRegionResponseDto : BaseResponse
    {
        public dynamic? Data { get; set; }
    }
    public class CommonResponseDto:BaseResponse
    {
        public dynamic? Data { get; set; }
    }

    public class UserDeptResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<UserDeptModel>? Data { get; set; }
    }

    public class UserDepotResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<UserDepotModel>? Data { get; set; }
    }


}
