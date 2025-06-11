using Microsoft.VisualBasic;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.NotificationSender
{
    public class MailResponse
    {
        [JsonProperty("responseCode")]
        public int ResponseCode { get; set; }
        [JsonProperty("responseMsg")]
        public string? ResponseMsg { get; set; }
    }
    public class SMSResponse
    {
        [JsonProperty("responseCode")]
        public int ResponseCode { get; set; }
        [JsonProperty("responseMsg")]
        public string? ResponseMsg { get; set; }
    }
}
