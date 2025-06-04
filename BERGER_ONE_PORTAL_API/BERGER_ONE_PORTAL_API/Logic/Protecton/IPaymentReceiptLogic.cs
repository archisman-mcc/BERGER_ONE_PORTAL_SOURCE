using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface IPaymentReceiptLogic
    {
        Task<PaymentReceiptResponseDto> GetPRList(PaymentReceiptRequestDto? request, string user_id);
    }
}
