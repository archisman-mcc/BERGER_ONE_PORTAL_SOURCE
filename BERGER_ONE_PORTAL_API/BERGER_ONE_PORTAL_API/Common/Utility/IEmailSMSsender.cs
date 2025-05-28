using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Common.Utility
{
    public interface IEmailSMSsender
    {
        Task<SMSResponseDto> SMS_Sender(string MobileNos, string Message, string BulkYn, string CT_ID, string SID);
        Task<MailResponseDto> SendMail(MailRequestDto obj);
    }
}
