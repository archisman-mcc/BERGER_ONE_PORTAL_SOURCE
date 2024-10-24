using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using System.Data;
using System.Net;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton.Adapter
{
    public class LegalAdapter
    {
        public static LegalResponseDto? MapLegalOutStandingResponse(MSSQLResponse? data)
        {
            LegalResponseDto? response = null;
            if (data != null)
            {
                if (data != null && data.Data != null)
                {
                    var ds = (data?.Data as DataSet);
                    if (ds != null && ds.Tables.Count > 0)
                    {
                        response = new LegalResponseDto();
                        response.Data = ds;

                        if (response != null && response.Data.Tables[0].Rows.Count > 0)
                        {
                            response.success = true;
                            response.message = "Success";
                            response.statusCode = HttpStatusCode.OK;
                        }
                        else
                        {
                            response.Data = null;
                            response.success = false;
                            response.message = "No Content";
                            response.statusCode = HttpStatusCode.NoContent;
                        }
                    }
                    else
                    {
                        response.Data = null;
                        response.success = false;
                        response.message = "No Content";
                        response.statusCode = HttpStatusCode.NoContent;
                    }
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = "Data Access Response is null or empty";
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }
    }
}
