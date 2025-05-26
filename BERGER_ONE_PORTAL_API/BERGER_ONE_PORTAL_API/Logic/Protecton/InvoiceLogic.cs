using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Proxy;
using BERGER_ONE_PORTAL_API.Repository.JWT;
using BERGER_ONE_PORTAL_API.Repository.Protecton;
using System.Data;
using System.Net;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public class InvoiceLogic : IInvoiceLogic
    {
        public IInvoiceRepo _invoiceRepo;
        private readonly IJwtManager _jwtManager;
        private readonly ICommonProxy _commonProxy;

        public InvoiceLogic(IInvoiceRepo InvoiceRepo, IJwtManager jwtManager, ICommonProxy commonProxy)
        {
            _invoiceRepo = InvoiceRepo;
            _jwtManager = jwtManager;
            _commonProxy = commonProxy;
        }

        public async Task<InvoiceResponseDto> GetInvoiceDetails(InvoiceDetailsRequestDto? request, string user_id)
        {
            InvoiceResponseDto response = new InvoiceResponseDto();
            var dbResponse = await _invoiceRepo.GetInvoiceDetails(request, user_id);
            if (dbResponse != null)
            {
                var ds = dbResponse.Data as DataSet;
                if (ds != null && ds.Tables.Count > 0)
                {
                    response.Data = ds;
                    response.success = true;
                    response.message = Constant.ResponseMsg.Success;
                    response.statusCode = HttpStatusCode.OK;
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = Constant.ResponseMsg.NoData;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = Constant.ResponseMsg.NoData;
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }
    }
}
