using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Logic.Protecton.Adapter;
using BERGER_ONE_PORTAL_API.Proxy;
using BERGER_ONE_PORTAL_API.Repository.JWT;
using BERGER_ONE_PORTAL_API.Repository.Protecton;
using System.Data;
using System.Net;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public class DSRLogic : IDSRLogic
    {
        public IDSRRepo _dsrRepo;
        private readonly IJwtManager _jwtManager;
        private readonly ICommonProxy _commonProxy;

        public DSRLogic(IDSRRepo DSRRepo, IJwtManager jwtManager, ICommonProxy commonProxy)
        {
            _dsrRepo = DSRRepo;
            _jwtManager = jwtManager;
            _commonProxy = commonProxy;
        }

        public async Task<UserApplDlrSalesResponse> UserApplDlrSales(UserApplDlrSalesRequest? request, string user_id)
        {
            UserApplDlrSalesResponse response = new UserApplDlrSalesResponse();
            var dbResponse = await _dsrRepo.UserApplDlrSales(request, user_id);
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

        public async Task<UserApplDlrSalesResponse?> UserApplDlrSalesDtls(UserApplDlrSalesDtlsRequest request, string user_id)
        {
            UserApplDlrSalesResponse response = new UserApplDlrSalesResponse();
            var dbResponse = await _dsrRepo.UserApplDlrSalesDtls(request, user_id);
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
