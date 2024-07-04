using Microsoft.VisualBasic;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class MailRequest
    {
        [JsonProperty("mailToAddress")]
        public string? MailToAddress { get; set; }
        [JsonProperty("mailFromAddress")]
        public string? MailFromAddress { get; set; }
        [JsonProperty("mailCCAddress")]
        public string? MailCCAddress { get; set; }
        [JsonProperty("mailBCCAddress")]
        public string? MailBCCAddress { get; set; }
        [JsonProperty("mailSubject")]
        public string? MailSubject { get; set; }
        [JsonProperty("mailBody")]
        public string? MailBody { get; set; }
        [JsonProperty("mailAttachement")]
        public string? MailAttachement { get; set; }
    }
    public class SMSRequest
    {
        public string? MobileNo { get; set; }
        public string? Message { get; set; }
        public string? CT_ID { get; set; } = string.Empty;
        public string? SID { get; set; } = "BERSYS";
        public string? applicationName { get; set; } = "ONE_APP_SENDER";
    }
    public class WhatsAppPushNotificationACLRequest
    {
        public List<WhatsAppPushNotificationMediaMessage>? MediaMessages { get; set; }
        public List<WhatsAppPushNotificationMessage>? Messages { get; set; }
        public bool IsMediaMesaage { get; set; } = false;
        public string? NotificationCode { get; set; } = string.Empty;
        public string? UserId { get; set; }
        public string? NotificationId { get; set; }
    }
    public class WhatsAppPushNotificationMediaMessage
    {
        public string? sender { get; set; }
        public string? to { get; set; }
        public string? messageId { get; set; }
        public string? transactionId { get; set; }
        public string? channel { get; set; }
        public string? type { get; set; }
        public WhatsAppPushNotificationMediaTemplate? mediaTemplate { get; set; }

        public class WhatsAppPushNotificationMediaTemplate
        {
            public object? parameters { get; set; }
            public string? mediaUrl { get; set; }
            public string? contentType { get; set; }
            public string? template { get; set; }
            public string? langCode { get; set; }
            public List<WhatsAppPushNotificationButton>? buttons { get; set; }
            public List<WhatsAppPushNotificationTemplateBody>? body { get; set; }
        }
    }
    public class WhatsAppPushNotificationMessage
    {
        public string? sender { get; set; }
        public string? to { get; set; }
        public string? messageId { get; set; }
        public string? transactionId { get; set; }
        public string? channel { get; set; }
        public string? type { get; set; }
        public WhatsAppPushNotificationTemplate? template { get; set; }

        public class WhatsAppPushNotificationTemplate
        {
            public List<WhatsAppPushNotificationTemplateBody>? body { get; set; }
            public string? templateId { get; set; }
            public string? langCode { get; set; }
            public List<WhatsAppPushNotificationButton>? buttons { get; set; }
        }
    }
    public class WhatsAppPushNotificationButton
    {
        public string? index { get; set; }
        public string? subType { get; set; }
        public WhatsAppPushNotificationParameters? parameters { get; set; }

        public class WhatsAppPushNotificationParameters
        {
            public string? type { get; set; }
            public string? text { get; set; }
        }
    }
    public class WhatsAppPushNotificationTemplateBody
    {
        public string? type { get; set; }
        public string? text { get; set; }
    }
    public class WhatsAppPushNotificationModel
    {
        public List<WhatsAppPushNotificationMessage>? messages { get; set; }
        public string? responseType { get; set; }
    }
    public class WhatsAppPushNotificationMediaModel
    {
        public List<WhatsAppPushNotificationMediaMessage>? messages { get; set; }
        public string? responseType { get; set; }
    }
}
