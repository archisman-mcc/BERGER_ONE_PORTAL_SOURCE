using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using static BERGER_ONE_PORTAL_API.Common.Utilty.Constant;

namespace BERGER_ONE_PORTAL_API.Common.Utility
{
    public class EmailSMSsender : IEmailSMSsender
    {
        public async Task<SMSResponseDto> SMS_Sender(string MobileNos, string Message, string BulkYn = "N", string CT_ID = "", string SID = "BPILIT")
        {
            string formatingString;
            SMSResponseDto response = null;
            try
            {
                string[] address = MobileNos.Split(',');
                for (int i = 0; i <= address.Length - 1; i++)
                {
                    string no = address[i].Trim();
                    if (no != string.Empty | no != null)
                    {
                        formatingString = "91" + no;
                        response = await SendSMS(formatingString, Message, BulkYn, CT_ID, SID);
                    }
                }
            }
            catch (Exception ex)
            {
                response = new SMSResponseDto()
                {
                    message = ResponseMsg.Failed,
                    success = false,
                };
            }
            return response;
        }
        public async Task<SMSResponseDto> SendSMS(string Mobile_Number, string Message, string BulkYn = "N", string CT_ID = "", string SID = "BPILIT", string MType = "N", string DR = "N")
        {
            SMSResponseDto response = null;
            try
            {
                // Define the base URL for the API
                string baseUrl = "https://bpilmobile.bergerindia.com/smsapi/berger.asmx/SendSMSWithSender";

                // Prepare the form data
                var formData = new Dictionary<string, string>
                {
                    { "AuthKey", Constant.Common.AuthKeyBergerSms },
                    { "MobileNumber", Mobile_Number },
                    { "TextMessage", Message },
                    { "TemplateID", CT_ID },
                    { "AppName", Constant.Common.NotificationAppname },
                    { "SenderID", SID }
                };

                // Initialize HttpClient instance
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Host", "bpilmobile.bergerindia.com");
                    // Prepare the form data as x-www-form-urlencoded content
                    var content = new FormUrlEncodedContent(formData);
                    // Perform the POST request
                    HttpResponseMessage res = await client.PostAsync(baseUrl, content);

                    if (res.IsSuccessStatusCode)
                    {
                        response = new SMSResponseDto()
                        {
                            message = await res.Content.ReadAsStringAsync(),
                            success = true,
                        };
                    }
                    else
                    {
                        response = new SMSResponseDto()
                        {
                            message = await res.Content.ReadAsStringAsync(),
                            success = false,
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                response = new SMSResponseDto()
                {
                    message = ResponseMsg.Failed,
                    success = false,
                };
            }
            return response;
        }
        public async Task<MailResponseDto> SendMail(MailRequestDto obj)
        {
            MailResponseDto response = null;
            try
            {
                string postData = JsonConvert.SerializeObject(obj);
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                // Use HttpClient for better readability and management
                using (HttpClient client = new HttpClient())
                {
                    // Set headers
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Constant.Common.MCCWebAPIAuthToken);

                    // Make the POST request
                    var content = new StringContent(postData, Encoding.UTF8, "application/json");
                    HttpResponseMessage res = await client.PostAsync("https://bpilmobile.bergerindia.com/mccapis/email/v1/send", content);


                    if (res.IsSuccessStatusCode)
                    {
                        response = new MailResponseDto()
                        {
                            message = await res.Content.ReadAsStringAsync(),
                            success = true,
                        };
                    }
                    else
                    {
                        response = new MailResponseDto()
                        {
                            message = await res.Content.ReadAsStringAsync(),
                            success = false,
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                response = new MailResponseDto()
                {
                    message = ResponseMsg.Failed,
                    success = false,
                };
            }

            return response;
        }
    }
}
