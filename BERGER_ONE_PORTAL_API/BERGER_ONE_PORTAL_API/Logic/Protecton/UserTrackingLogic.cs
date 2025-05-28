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
    public class UserTrackingLogic : IUserTrackingLogic
    {
        public IUserTrackingRepo _userTrackingRepo;
        private readonly IJwtManager _jwtManager;
        private readonly ICommonProxy _commonProxy;
        private readonly IConfiguration _configuration;
        private string? DOC_REL_PATH;

        public UserTrackingLogic(IUserTrackingRepo UserTrackingRepo, IJwtManager jwtManager, ICommonProxy commonProxy, IConfiguration configuration)
        {
            _userTrackingRepo = UserTrackingRepo;
            _jwtManager = jwtManager;
            _commonProxy = commonProxy;
            DOC_REL_PATH = configuration["AppSettings:UPLOAD_DOCS_FOLDER_REL_PATH"];
        }

        public async Task<UserTrackingResponseDto> GetDSRRegn(UserTrackingRequestDto? request)
        {
            UserTrackingResponseDto response = new UserTrackingResponseDto();
            var dbResponse = await _userTrackingRepo.GetDSRRegn(request);
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

        public async Task<UserTrackingResponseDto> GetDSRRegnCat(DSRRegionCatRequestDto? request)
        {
            UserTrackingResponseDto response = new UserTrackingResponseDto();
            var dbResponse = await _userTrackingRepo.GetDSRRegnCat(request);
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

        public async Task<UserTrackingResponseDto> GetDSRRegnTiger(DSRRegionCatRequestDto? request)
        {
            UserTrackingResponseDto response = new UserTrackingResponseDto();
            var dbResponse = await _userTrackingRepo.GetDSRRegnTiger(request);
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

        public async Task<UserTrackingResponseDto> GetDSRRegnOther(DSRRegionCatRequestDto? request)
        {
            UserTrackingResponseDto response = new UserTrackingResponseDto();
            var dbResponse = await _userTrackingRepo.GetDSRRegnOther(request);
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

        public async Task<UserTrackingResponseDto> GetHistory(GetHistoryRequestDto? request)
        {
            UserTrackingResponseDto response = new UserTrackingResponseDto();
            var dbResponse = await _userTrackingRepo.GetHistory(request);
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

        public async Task<UserTrackingResponseDto> GetUserCollectionList(UserCollectionListRequestDto? request)
        {
            UserTrackingResponseDto response = new UserTrackingResponseDto();
            var dbResponse = await _userTrackingRepo.GetUserCollectionList(request);
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
        public async Task<UserTrackingResponseDto> GetVisitHistoryUserwise(GetVisitHistoryUserwiseRequestDto? request)
        {
            UserTrackingResponseDto response = new UserTrackingResponseDto();
            var dbResponse = await _userTrackingRepo.GetVisitHistoryUserwise(request, DOC_REL_PATH + "/VisitGeoCamImages/");
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
        public async Task<UserTrackingResponseDto> GetVisitHistoryLocation(GetVisitHistoryLocationRequestDto? request)
        {
            UserTrackingResponseDto response = new UserTrackingResponseDto();
            var dbResponse = await _userTrackingRepo.GetVisitHistoryLocation(request);
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
