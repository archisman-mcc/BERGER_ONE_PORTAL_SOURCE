using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;
using System.Data;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class ReminderResponse : BaseResponse
    {
        public dynamic? Data { get; set; }
    }
    public class FinYesrResponse : BaseResponse
    {
        public dynamic? Data { get; set; }
    }
    public class PromotionalMsgResponseDto : BaseResponse
    {
        public dynamic? Data { get; set; }
    }
    public class GetRegionResponseDto : BaseResponse
    {
        public dynamic? Data { get; set; }
    }
    public class CommonResponseDto : BaseResponse
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

    public class UserApplAppResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<UserApplAppModel>? Data { get; set; }
    }

    public class UserApplTerrResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<UserApplTerrModel>? Data { get; set; }
    }

    public class AllUserGroupResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<AllUserGroupModel>? Data { get; set; }
    }

    public class UserTerrResponseDto : BaseResponse
    {
        [JsonProperty("data")]
        public List<UserTerrDepotWiseModel>? Data { get; set; }
    }

    public class UserInsertResponseDto : BaseResponse
    {
        [JsonProperty("response_message")]
        public string? ResponseMessage { get; set; }
    }

    public class FilePathResponse : BaseResponse
    {
        public dynamic? Data { get; set; }
    }

    public class ReportRequest
    {
        [JsonProperty("data")]
        public DataSet? Data { get; set; }

        [JsonProperty("report_name")]
        public string? Reportname { get; set; }

        [JsonProperty("file_name")]
        public string? FileName { get; set; }

        [JsonProperty("table_index")]
        public int? TableIndex { get; set; }
    }

    public class SMSResponseDto
    {
        public string? message { get; set; }
        public bool success { get; set; }
    }
    public class MailResponseDto
    {
        public string? message { get; set; }
        public bool success { get; set; }
    }

    public class MailRequestDto
    {
        public string? mailToAddress { get; set; }
        public string? mailFromAddress { get; set; }
        public string? mailCCAddress { get; set; }
        public string? mailBCCAddress { get; set; }
        public string? mailSubject { get; set; }
        public string? mailBody { get; set; }
        public string? mailAttachement { get; set; }
        public string? mailSenderApp { get; set; }
        public string? mailSenderTask { get; set; }
    }

    public class CommonLovDtlsResponseDto : BaseResponse
    {
        public dynamic? Data { get; set; }
    }
}
