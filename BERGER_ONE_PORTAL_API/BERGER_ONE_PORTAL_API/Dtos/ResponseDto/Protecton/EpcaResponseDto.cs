using BERGER_ONE_PORTAL_API.Models;
using BERGER_ONE_PORTAL_API.Models.Protecton;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton
{
    public class EpcaResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public dynamic? Data { get; set; }

    }

    public class EpcaStatusResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<EpcaStatusModel>? Data { get; set; }

    }
}
