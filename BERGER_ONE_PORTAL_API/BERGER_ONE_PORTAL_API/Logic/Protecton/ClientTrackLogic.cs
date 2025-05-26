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
    public class ClientTrackLogic : IClientTrackLogic
    {
        public IClientTrackRepo _clientTrackRepo;
        private readonly IJwtManager _jwtManager;
        private readonly ICommonProxy _commonProxy;

        public ClientTrackLogic(IClientTrackRepo ClientTrackRepo, IJwtManager jwtManager, ICommonProxy commonProxy)
        {
            _clientTrackRepo = ClientTrackRepo;
            _jwtManager = jwtManager;
            _commonProxy = commonProxy;
        }

        public async Task<ClientTrackResponseDto?> GetCTDealer(ClientTrackDealerRequestDto? request, string user_id)
        {
            ClientTrackResponseDto response = new ClientTrackResponseDto();
            var dbResponse = await _clientTrackRepo.GetCTDealer(request, user_id);
            if (dbResponse != null)
            {
                var ds = dbResponse.Data as DataSet;
                if (ds != null && ds.Tables.Count > 0)
                {
                    response.Data = ds;
                    response.success = true;
                    response.message = "Success";
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

        public async Task<ClientTrackResponseDto?> GetCTDetail(ClientTrackDetailRequestDto? request, string user_id)
        {
            ClientTrackResponseDto response = new ClientTrackResponseDto();
            var dbResponse = await _clientTrackRepo.GetCTDetail(request, user_id);
            if (dbResponse != null)
            {
                var ds = dbResponse.Data as DataSet;
                if (ds != null && ds.Tables.Count > 0)
                {
                    response.Data = ds;
                    response.success = true;
                    response.message = "Success";
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

        public async Task<ClientTrackResponseDto?> GetCTDetailTiger(ClientTrackTigerRequestDto? request, string user_id)
        {
            ClientTrackResponseDto response = new ClientTrackResponseDto();
            var dbResponse = await _clientTrackRepo.GetCTDetailTiger(request, user_id);
            if (dbResponse != null)
            {
                var ds = dbResponse.Data as DataSet;
                if (ds != null && ds.Tables.Count > 0)
                {
                    response.Data = ds;
                    response.success = true;
                    response.message = "Success";
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

        public async Task<ClientTrackResponseDto?> GetCTOtherDetail(ClientTrackOtherDetailRequestDto? request, string user_id)
        {
            ClientTrackResponseDto response = new ClientTrackResponseDto();
            var dbResponse = await _clientTrackRepo.GetCTOtherDetail(request, user_id);
            if (dbResponse != null)
            {
                var ds = dbResponse.Data as DataSet;
                if (ds != null && ds.Tables.Count > 0)
                {
                    response.Data = ds;
                    response.success = true;
                    response.message = "Success";
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
