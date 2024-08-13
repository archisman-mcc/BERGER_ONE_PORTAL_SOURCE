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

    public class EpcaDealersResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<EpcaDealersModel>? Data { get; set; }

    }

    public class EpcaPrjoctResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<EpcaProjectModel>? Data { get; set; }

    }

    public class EpcaBillToResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<EpcaBillToModel>? Data { get; set; }

    }

    public class EpcaFactoryResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<EpcaFactoryModel>? Data { get; set; }

    }
}
