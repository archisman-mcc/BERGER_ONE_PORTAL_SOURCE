using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.NotificationSender;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Web;
using BERGER_ONE_PORTAL_API.Foundation;
using BERGER_ONE_PORTAL_API.Models;

namespace BERGER_ONE_PORTAL_API.Proxy;

public class CommonProxy(HttpHelper httpHelper, IConfiguration configuration) : ICommonProxy
{
    public async Task<MailResponse?> SendMail(MailRequest dto)
    {
        MailResponse? res = null;

        try
        {
            dto.MailAttachement ??= string.Empty;

            var header = new Dictionary<string, string>
                {
                    { "Authorization", "Basic " + Convert.ToString(configuration["AuthenticationKey:MCCWebAPIAuthToken"])}
                };
            
            var response = await httpHelper.PostAsync(nameof(SendMail), MSSQL_HELPER.Model.Constants.Common.BergerEmailAPI, new MediaTypeWithQualityHeaderValue(MediaTypeNames.Application.Json), header, null, new StringContent(JsonConvert.SerializeObject(dto), Encoding.UTF8, MediaTypeNames.Application.Json));

            if (response.IsSuccessStatusCode)
            {
                res = JsonConvert.DeserializeObject<MailResponse>(await response.Content.ReadAsStringAsync());
            }

        }
        catch (Exception ex)
        {
            res = new MailResponse()
            {
                ResponseCode = 500,
                ResponseMsg = ex.Message,
            };
        }

        return res;
    }

    public async Task<SMSResponse?> SendSms(SMSRequest request)
    {
        SMSResponse? result;

        try
        {
            var formData = new Dictionary<string, string?>
            {
                    { "AuthKey", HttpUtility.UrlPathEncode(MSSQL_HELPER.Model.Constants.Common.AuthKeyBergerSms) },
                    { "MobileNumber", HttpUtility.UrlPathEncode(request.MobileNo) },
                    { "TextMessage", HttpUtility.UrlPathEncode(request.Message)},
                    { "TemplateID", HttpUtility.UrlPathEncode(request.CT_ID) },
                    { "AppName", HttpUtility.UrlPathEncode(MSSQL_HELPER.Model.Constants.Common.NotificationAppname) }

                };

            var response = await httpHelper.PostAsync(nameof(SendSms), MSSQL_HELPER.Model.Constants.Common.BergerSMSAPI, new MediaTypeWithQualityHeaderValue(MediaTypeNames.Application.Json), null, null, new FormUrlEncodedContent(formData));


            result = new SMSResponse()
            {
                ResponseCode = Convert.ToInt32(response.StatusCode),
                ResponseMsg = await response.Content.ReadAsStringAsync()
            };
        }
        catch (Exception ex)
        {
            result = new SMSResponse()
            {
                ResponseCode = 500,
                ResponseMsg = ex.Message
            };
        }

        return result;
    }

    public async Task<string?> SendPushNotificationAcl(WhatsAppPushNotificationACLRequest msg)
    {
        Dictionary<string, string>? dic = new Dictionary<string, string>
            {
                { "user", MSSQL_HELPER.Model.Constants.Common.ACLWhatsappAPIUserId },
                { "pass", MSSQL_HELPER.Model.Constants.Common.ACLWhatsappAPIPassword }
            };

        HttpResponseMessage? response;
        string responseMsg;

        try
        {
            if (msg.IsMediaMesaage)
            {
                response = await httpHelper.PostAsync("SendPushNotificationACL", MSSQL_HELPER.Model.Constants.Common.ACLWhatsappAPIUrl, new MediaTypeWithQualityHeaderValue("application/json"), dic, null, new StringContent(JsonConvert.SerializeObject(
                new WhatsAppPushNotificationMediaModel()
                {
                    messages = msg.MediaMessages,
                    responseType = "json"

                }), Encoding.UTF8, "application/json"));
            }
            else
            {
                response = await httpHelper.PostAsync("SendPushNotificationACL", MSSQL_HELPER.Model.Constants.Common.ACLWhatsappAPIUrl, new MediaTypeWithQualityHeaderValue("application/json"), dic, null, new StringContent(JsonConvert.SerializeObject(
                new WhatsAppPushNotificationModel()
                {
                    messages = msg.Messages,
                    responseType = "json"

                }), Encoding.UTF8, "application/json"));
            }

            responseMsg = string.Concat("Msg: ", await response.Content.ReadAsStringAsync(), " Code: ", response.StatusCode);

        }
        catch (Exception ex)
        {
            responseMsg = "Exception: " + JsonConvert.SerializeObject(ex.StackTrace) + " Inner Exception: " + JsonConvert.SerializeObject(ex.InnerException?.StackTrace + " Msg: " + ex.Message + " ExceptionMsg: " + JsonConvert.SerializeObject(ex.InnerException?.Message) + " Details: " + JsonConvert.SerializeObject(ex));
        }

        return responseMsg;
    }

    public async Task<HttpResponseMessage?> MakeCall(KnowlarityMakeCallModel request)
    {
        var dic = new Dictionary<string, string?>
            {
                { "Authorization", MSSQL_HELPER.Model.Constants.Common.KnowlarityAuthorization },
                { "x-api-key",  MSSQL_HELPER.Model.Constants.Common.KnowlarityApiKey }
            };

        return await httpHelper.PostAsync(nameof(MakeCall), MSSQL_HELPER.Model.Constants.Common.KnowlarityApiUrl, new MediaTypeWithQualityHeaderValue(MediaTypeNames.Application.Json), dic, null, new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, MediaTypeNames.Application.Json));
    }
}