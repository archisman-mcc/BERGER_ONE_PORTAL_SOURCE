using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.UserProfileResponse;
using BERGER_ONE_PORTAL_API.Models;
using BERGER_ONE_PORTAL_API.Models.Protecton;
using System.Data;
using System.Net;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton.Adapter
{
    public class EpcaAdapter
    {


        public static EpcaStatusResponseDto? MapPcaStatusResponse(MSSQLResponse? data)
        {
            EpcaStatusResponseDto? response = null;
            if (data != null)
            {
                response = new EpcaStatusResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new EpcaStatusModel()
                    {
                        LovValue = dr.Field<string?>("lov_value"),
                        LovCode = dr.Field<string?>("lov_code"),
                    })
                    .ToList(),
                };
                if (response != null && response.Data.Count > 0)
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
            return response;
        }

        public static EpcaResponseDto? MapEpcaListResponse(MSSQLResponse? data)
        {
            EpcaResponseDto? response = null;
            if (data != null)
            {


                if (data != null && data.Data != null)
                {
                    var ds = (data?.Data as DataSet);
                    if (ds != null && ds.Tables.Count > 0)
                    {
                        response = new EpcaResponseDto();
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
