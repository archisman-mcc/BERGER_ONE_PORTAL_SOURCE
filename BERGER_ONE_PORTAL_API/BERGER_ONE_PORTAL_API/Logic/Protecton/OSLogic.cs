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
    public class OSLogic: IOSLogic
    {
        public IOSRepo _OSRepo;
        private readonly IJwtManager _jwtManager;
        private readonly ICommonProxy _commonProxy;

        public OSLogic(IOSRepo OSRepo, IJwtManager jwtManager, ICommonProxy commonProxy)
        {
            _OSRepo = OSRepo;
            _jwtManager = jwtManager;
            _commonProxy = commonProxy;
        }

        public async Task<OSResponseDto> UserApplOSDetails(GetOSRequestDtlsDto? request, string user_id)
        {
            OSResponseDto response = new OSResponseDto();
            var dbResponse = await _OSRepo.UserApplOSDetails(request, user_id);
            if (dbResponse != null)
            {
                var dt = dbResponse.Data as DataTable;
                if (dt != null && dt.Rows.Count > 0)
                {
                    DataSet ds = new DataSet();
                    ds.Tables.Add(dt);
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


        public async Task<OSResponseDto> UserApplDlrOSSingle(GetOSSingleSmryRequestDto? request, string user_id)
        {
            OSResponseDto response = new OSResponseDto();
            var dbResponse = await _OSRepo.UserApplDlrOSSingle(request, user_id);
            if (dbResponse != null)
            {
                var dt = dbResponse.Data as DataTable;
                if (dt != null && dt.Rows.Count > 0)
                {
                    DataSet ds = new DataSet();
                    ds.Tables.Add(dt);
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


        public async Task<OSResponseDto> UserApplDlrOSTrx(GetTRXSmryRequestDto? request, string user_id)
        {
            OSResponseDto response = new OSResponseDto();
            var dbResponse = await _OSRepo.UserApplDlrOSTrx(request, user_id);
            if (dbResponse != null)
            {
                var dt = dbResponse.Data as DataTable;
                if (dt != null && dt.Rows.Count > 0)
                {
                    DataSet ds = new DataSet();
                    ds.Tables.Add(dt);
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
        public async Task<OSResponseDto> ODbyDateList(ODbyDateListDto request, string user_id)
        {
            OSResponseDto response = new OSResponseDto();
            var dbResponse = await _OSRepo.ODbyDateList(request, user_id);
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
