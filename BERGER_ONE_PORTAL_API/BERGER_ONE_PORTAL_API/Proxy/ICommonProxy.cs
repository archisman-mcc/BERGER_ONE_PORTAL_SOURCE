using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Models;
using BERGER_ONE_PORTAL_API.NotificationSender;

namespace BERGER_ONE_PORTAL_API.Proxy;

public interface ICommonProxy
{
    Task<MailResponse?> SendMail(MailRequest dto);
    Task<SMSResponse?> SendSms(SMSRequest request);
    Task<string?> SendPushNotificationAcl(WhatsAppPushNotificationACLRequest msg);
    Task<HttpResponseMessage?> MakeCall(KnowlarityMakeCallModel request);
}