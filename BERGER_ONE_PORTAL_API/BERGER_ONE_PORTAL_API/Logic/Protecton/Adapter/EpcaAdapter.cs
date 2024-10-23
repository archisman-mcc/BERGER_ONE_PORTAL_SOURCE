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
                        LovField1Value = dr.Field<string?>("lov_field1_value"),
                        LovField2Value = dr.Field<string?>("lov_field2_value"),
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

        public static EpcaDealersResponseDto? MapPcaDealerResponse(MSSQLResponse? data)
        {
            EpcaDealersResponseDto? response = null;
            if (data != null)
            {
                response = new EpcaDealersResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new EpcaDealersModel()
                    {
                        DealerCode = dr.Field<string?>("dealer_code"),
                        DealerName = dr.Field<string?>("dealer_name"),
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

        public static EpcaPrjoctResponseDto? MapPcaProjectResponse(MSSQLResponse? data)
        {
            EpcaPrjoctResponseDto? response = null;
            if (data != null)
            {
                response = new EpcaPrjoctResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new EpcaProjectModel()
                    {
                        ProjectId = dr.Field<int?>("ProjectId"),
                        ProjectName = dr.Field<string?>("ProjectName"),
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

        public static EpcaBillToResponseDto? MapPcaBillToResponse(MSSQLResponse? data)
        {
            EpcaBillToResponseDto? response = null;
            if (data != null)
            {
                response = new EpcaBillToResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new EpcaBillToModel()
                    {
                        bill_to = dr.Field<decimal?>("bill_to"),
                        bill_to_name = dr.Field<string?>("bill_to_name"),
                        pd_appl_yn = dr.Field<string?>("pd_appl_yn"),
                        project_appl_yn = dr.Field<string?>("project_appl_yn"),
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

        public static EpcaFactoryResponseDto? MapPcaFactoryResponse(MSSQLResponse? data)
        {
            EpcaFactoryResponseDto? response = null;
            if (data != null)
            {
                response = new EpcaFactoryResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new EpcaFactoryModel()
                    {
                        org_code = dr.Field<string?>("org_code"),
                        org_name = dr.Field<string?>("org_name"),
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

        public static EpcaMinRateResponseDto? MapSkuMinRateResponse(MSSQLResponse? data)
        {
            EpcaMinRateResponseDto? response = null;
            if (data != null)
            {
                response = new EpcaMinRateResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new EpcaSkuMinRateModel()
                    {
                        smr_sku_code = dr.Field<string?>("smr_sku_code"),
                        smr_packsize = dr.Field<decimal?>("smr_packsize"),
                        smr_min_rate = dr.Field<decimal?>("smr_min_rate"),
                        smr_rebate = dr.Field<decimal?>("smr_rebate"),
                    })
                    .ToList(),
                };
                if (response != null && response.Data != null && response.Data.Count > 0)
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


        public static EpcaDetailsStatusResponseDto? MapPcaDetailsStatusResponse(MSSQLResponse? data)
        {
            EpcaDetailsStatusResponseDto? response = null;
            if (data != null)
            {
                response = new EpcaDetailsStatusResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new PcaDetailsStatusModel()
                    {
                        pd_auto_id = dr.Field<decimal?>("pd_auto_id"),
                        pd_status = dr.Field<string?>("pd_status"),
                    })
                    .ToList(),
                };
                if (response != null && response.Data != null && response.Data.Count > 0)
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

        public static EpcaStatusResponseDto? MapTlvStatusResponse(MSSQLResponse? data)
        {
            EpcaStatusResponseDto? response = null;
            if (data != null)
            {
                response = new EpcaStatusResponseDto()
                {
                    Data = (data.Data as DataSet)?.Tables.OfType<DataTable>().FirstOrDefault()?.AsEnumerable().Select(dr => new EpcaStatusModel()
                    {
                        LovCode = dr.Field<string?>("lov_code"),
                        LovValue = dr.Field<string?>("lov_value"),
                    })
                    .ToList(),
                };
                if (response != null && response.Data != null && response.Data.Count > 0)
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

        public static PcaInsertResponseDto? MapPcaInsertResponse(MSSQLResponse? data)
        {
            PcaInsertResponseDto? response = new PcaInsertResponseDto();
            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);

                if (OutputCode <= 0) throw new Exception(OutputMsg);
                else response.ResponseMessage = OutputMsg;
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }

        public static PcaDeleteResponseDto? MapPcaDeleteResponse(MSSQLResponse? data)
        {
            PcaDeleteResponseDto? response = new PcaDeleteResponseDto();
            if (data != null)
            {
                int OutputCode = int.TryParse(Convert.ToString(data.OutputParameters?[0].Value), out _) ? Convert.ToInt32(data.OutputParameters?[0].Value) : -1;
                string? OutputMsg = Convert.ToString(data.OutputParameters?[1].Value);

                if (OutputCode <= 0) throw new Exception(OutputMsg);
                else response.ResponseMessage = OutputMsg;
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }

        public static PcaCancleResponseDto? MapPcaCancleResponse(MSSQLResponse? data)
        {
            PcaCancleResponseDto? response = new PcaCancleResponseDto();
            if (data != null)
            {
               response.ResponseMessage = "operation successful";
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }

        public static EpcaResponseDto? MapSKUListResponse(MSSQLResponse? data)
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

        public static EpcaDetailsGetListResponseDto? MapPcaDetailsResponse(MSSQLResponse? data)
        {
            EpcaDetailsGetListResponseDto? response = null;
            if (data != null)
            {

                if (data != null && data.Data != null)
                {
                    var ds = (data?.Data as DataSet);
                    if (ds != null && ds.Tables.Count > 0)
                    {
                        response = new EpcaDetailsGetListResponseDto();
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


        public static EpcaCancellationGetListResponseDto? MapPcaCancellationResponse(MSSQLResponse? data)
        {
            EpcaCancellationGetListResponseDto? response = null;
            if (data != null)
            {

                if (data != null && data.Data != null)
                {
                    var ds = (data?.Data as DataSet);
                    if (ds != null && ds.Tables.Count > 0)
                    {
                        response = new EpcaCancellationGetListResponseDto();
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

        #region "TLV MODULE"
        // CREATED BY SOUMYA SHUBHRA ROY -- 20-08-2024

        public static EpcaResponseDto? MapTlvRevisionListResponse(MSSQLResponse? data)
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

        public static EpcaResponseDto? MapTlvDepotApprovalResponse(MSSQLResponse? data)
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

        public static EpcaResponseDto? MapTlvRSMApprovalResponse(MSSQLResponse? data)
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

        public static EpcaResponseDto? MapEpcaDynamicResponse(MSSQLResponse? data)
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


        public static TlvRevisionResponseDto? MapTlvApproveResponse(MSSQLResponse? data)
        {
            TlvRevisionResponseDto? response = new TlvRevisionResponseDto();
            if (data != null)
            { response.ResponseMessage = "Successful";
            }
            else throw new ArgumentNullException("Data Access Response is null or empty");
            return response;
        }

        public static EpcaResponseDto? MapTlvRevisionDetailsListResponse(MSSQLResponse? data)
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
        #endregion
    }
}
