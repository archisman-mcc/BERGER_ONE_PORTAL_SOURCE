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

    public class EpcaMinRateResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<EpcaSkuMinRateModel>? Data { get; set; }

    }

    public class EpcaDetailsStatusResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<PcaDetailsStatusModel>? Data { get; set; }

    }

    public class EpcaDetailsGetListResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public dynamic? Data { get; set; }

    }

    public class PcaInsertResponseDto : BaseResponse
    {
        [JsonProperty("response_message")]
        public string? ResponseMessage { get; set; }
    }

    public class PcaDeleteResponseDto : BaseResponse
    {
        [JsonProperty("response_message")]
        public string? ResponseMessage { get; set; }
    }
}
