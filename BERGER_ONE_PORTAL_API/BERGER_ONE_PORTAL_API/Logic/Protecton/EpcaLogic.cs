using System.Data;
using System.Net;
using System.Text;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Enums;
using BERGER_ONE_PORTAL_API.Exceptions;
using BERGER_ONE_PORTAL_API.Extensions;
using BERGER_ONE_PORTAL_API.Logic.Protecton.Adapter;
using BERGER_ONE_PORTAL_API.Repository.JWT;
using BERGER_ONE_PORTAL_API.Repository.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public class EpcaLogic : IEpcaLogic
    {
        public IEpcaRepo _epcaRepo;
        private readonly IJwtManager _jwtManager;
        private readonly IConfiguration _configuration;

        public EpcaLogic(IEpcaRepo epcaRepo, IJwtManager jwtManager, IConfiguration configuration)
        {
            _epcaRepo = epcaRepo;
            _jwtManager = jwtManager;
            _configuration = configuration;
        }

        #region "EPCA MODULE"
        // COMMON DETAILS BIND
        public async Task<EpcaStatusResponseDto?> GetPcaStatusList(pcaStatusRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaStatusList(request);
            return EpcaAdapter.MapPcaStatusResponse(dataResponse);
        }
        // ===============================================================================


        // EPCA RSM LIST AND ENTRY -- (APPROVAL)
        public async Task<EpcaResponseDto?> GetPcaList(GetePCAListRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaList(request, user_id);
            return EpcaAdapter.MapEpcaListResponse(dataResponse);
        }
        // ===============================================================================


        // EPCA DEPOT LIST AND ENTRY -- (APPROVAL)
        // ===============================================================================


        // EPCA RSM LIST AND ENTRY -- (APPROVAL)
        public async Task<EpcaResponseDto?> GetPcaRsmList(GetePCAListRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaList(request, user_id);
            return EpcaAdapter.MapEpcaListResponse(dataResponse);
        }
        // ===============================================================================


        // EPCA HO LIST AND ENTRY -- (APPROVAL)
        // ===============================================================================

        #endregion





        public async Task<EpcaDealersResponseDto?> GetPcaDealersList(pcaDealersRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaDealersList(request);
            return EpcaAdapter.MapPcaDealerResponse(dataResponse);
        }

        public async Task<EpcaPrjoctResponseDto?> GetPcaProjectListByDepotTerr(pcaProjectRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaProjectListByDepotTerr(request);
            return EpcaAdapter.MapPcaProjectResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetSKUList(GetSKUListRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetSKUList(request);
            return EpcaAdapter.MapSKUListResponse(dataResponse);
        }

        public async Task<EpcaBillToResponseDto?> GetPcaBillToList(GetBillToRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaBillToList(request);
            return EpcaAdapter.MapPcaBillToResponse(dataResponse);
        }

        public async Task<EpcaFactoryResponseDto?> GetFactoryListBySKU(GetFactoryRequestDto request, string User_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetFactoryListBySKU(request, User_id);
            return EpcaAdapter.MapPcaFactoryResponse(dataResponse);
        }

        public async Task<EpcaMinRateResponseDto?> GetPcaMinRateBySku_Vr1(GetMinRateBySkuRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaMinRateBySku_Vr1(request);
            return EpcaAdapter.MapSkuMinRateResponse(dataResponse);
        }

        public async Task<PcaInsertResponseDto?> InsertePcaDetails_Vr1(PcaInsertRequestDto request, string User_id)
        {

            MSSQLResponse? dataResponse = await _epcaRepo.InsertePcaDetails_Vr1(request, User_id);
            return EpcaAdapter.MapPcaInsertResponse(dataResponse);
        }

        public async Task<EpcaDetailsStatusResponseDto?> PcaDetailsGetStatus(GetPcaDetailsStatusRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.PcaDetailsGetStatus(request);
            return EpcaAdapter.MapPcaDetailsStatusResponse(dataResponse);
        }

        public async Task<EpcaDetailsGetListResponseDto?> PcaDetailsGetDtl(GetPcaDetailsRequestDto request, string User_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.PcaDetailsGetDtl(request, User_id);
            return EpcaAdapter.MapPcaDetailsResponse(dataResponse);
        }

        public async Task<PcaDeleteResponseDto?> DeletePcaDetails(DeletePCARequestDto request, string User_id)
        {

            MSSQLResponse? dataResponse = await _epcaRepo.DeletePcaDetails(request, User_id);
            return EpcaAdapter.MapPcaDeleteResponse(dataResponse);
        }

        public async Task<EpcaCancellationGetListResponseDto?> PcaCancellationGetList(PcaCancellationRequestDto request, string User_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.PcaCancellationGetList(request, User_id);
            return EpcaAdapter.MapPcaCancellationResponse(dataResponse);
        }

        public async Task<PcaCancleResponseDto?> PcaCancellationUpdate(CanclePcaRequestDto request, string User_id)
        {

            MSSQLResponse? dataResponse = await _epcaRepo.PcaCancellationUpdate(request, User_id);
            return EpcaAdapter.MapPcaCancleResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetePCADepotApprovalList(GetePCADepotApprovalListRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCADepotApprovalList(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetePCADepotApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCADepotApprovalDetails(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetePCADetailsView(ePCADetailsViewRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCADetailsView(request);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        //public async Task<PcaInsertResponseDto?> PcaApprovalDetailsSubmit(PcaApprovalInsertRequestDto request, string User_id)
        //{
        //    MSSQLResponse? dataResponse = await _epcaRepo.PcaApprovalDetailsSubmit(request, User_id);
        //    return EpcaAdapter.MapPcaInsertResponse(dataResponse);
        //}

        public async Task<PcaInsertResponseDto?> PcaApprovalDetailsSubmit(PcaApprovalInsertRequestDto request, string User_id) => EpcaAdapter.MapPcaInsertResponse(await _epcaRepo.PcaApprovalDetailsSubmit(request, User_id));

        public async Task<EpcaResponseDto?> GetePCARsmApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCARsmApprovalDetails(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetePCAHoApprovalList(GetePCADepotApprovalDetailsRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCAHoApprovalList(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetePCAHoApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCAHoApprovalDetails(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }


        #region "TLV MODULE"
        // CREATED BY SOUMYA SHUBHRA ROY -- 20-08-2024
        public async Task<EpcaResponseDto?> GetTlvRevisionList(GetePCAListRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetTlvRevisionList(request, user_id);
            return EpcaAdapter.MapTlvRevisionListResponse(dataResponse);
        }

        public async Task<EpcaStatusResponseDto?> GetTlvStatusList(TlvStatusRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetTlvStatusList(request);
            return EpcaAdapter.MapTlvStatusResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetTlvRSMApprovalList(TlvRSMApprovalRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetTlvRSMApprovalList(request, user_id);
            return EpcaAdapter.MapTlvRSMApprovalResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetTlvRevisionLogDetails(TlvRevisionLogRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetTlvRevisionLogDetails(request);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<TlvRevisionResponseDto?> TlvRevisionApproval(TlvApprovalRequestDto request, string User_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.TlvRevisionApproval(request, User_id);
            return EpcaAdapter.MapTlvApproveResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetTlvHOApprovalList(TlvRSMApprovalRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetTlvHOApprovalList(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetTlvHoCommercialApprovalList(TlvRSMApprovalRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetTlvHoCommercialApprovalList(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> TlvGetTermDetails(TlvTermDetailsRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.TlvGetTermDetails(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<ResponseDto<long>> TlvDetailsSubmit(TlvDetailsSubmitRequestDto requestDto)
        {
            if ((requestDto.AadharDoc ?? "").Trim() != "")
                requestDto.AadharDoc =
                    requestDto.AadharDoc?.SaveBase64JpegImage(DocPathEnum.ProtectonMobAppDocsFolder,
                        @"TLV_FILES\AADHAR\", _configuration);
            
            if ((requestDto.PanDoc ?? "").Trim() != "")
                requestDto.PanDoc =
                    requestDto.PanDoc?.SaveBase64JpegImage(DocPathEnum.ProtectonMobAppDocsFolder,
                        @"TLV_FILES\PAN\", _configuration);
            
            if ((requestDto.LcbgDoc ?? "").Trim() != "")
                requestDto.LcbgDoc =
                    requestDto.LcbgDoc?.SaveBase64JpegImage(DocPathEnum.ProtectonMobAppDocsFolder,
                        @"TLV_FILES\LC_BG\", _configuration);
            
            if ((requestDto.ChequeDoc ?? "").Trim() != "")
                requestDto.ChequeDoc =
                    requestDto.ChequeDoc?.SaveBase64JpegImage(DocPathEnum.ProtectonMobAppDocsFolder,
                        @"TLV_FILES\BLANK_CHEQUE\", _configuration);
            
            if ((requestDto.FileDoc ?? "").Trim() != "")
                requestDto.FileDoc =
                    requestDto.FileDoc?.SaveBase64JpegImage(DocPathEnum.ProtectonMobAppDocsFolder,
                        @"TLV_FILES\DOC\", _configuration);

            requestDto.Status = "PENDING_DEPOT";

            var res = await _epcaRepo.TlvDetailsSubmit(requestDto);
            if (long.TryParse(res.OutputParameters?.FirstOrDefault(c => c.ParameterName == "@auto_id")?.Value?.ToString(), out var autoId))
            {
                //if ((requestDto.AutoId ?? 0) == 0)
                //{
                //    await TlvDetailsSubmit_SendMail(autoId, "NEW_REQUEST", requestDto.UserId);
                //}

                return new ResponseDto<long>()
                {
                    success = true,
                    statusCode = HttpStatusCode.OK,
                    message = Constant.ResponseMsg.Success,
                    Data = autoId
                };
            }

            throw new CustomException(Constant.ResponseMsg.Failed);
        }

        private async Task TlvDetailsSubmit_SendMail(long autoId, string status, string? userId)
        {
            //TlvRevisionClass obj = new TlvRevisionClass();
            if (await _epcaRepo.TlvGetEmailId(autoId, status, userId).ContinueWith(r => r.Result.Data as DataSet) is
                {
                    Tables.Count: > 0
                } ds 
                && ds.Tables.OfType<DataTable>().FirstOrDefault() is {} dt 
                && dt.AsEnumerable().Any())
            {
                try
                {
                    if (ds.Tables.OfType<DataTable>().ElementAtOrDefault(1) is {} dt1 && dt1.AsEnumerable().Any())
                    {
                        StringBuilder mailBody = new StringBuilder();
                        StringBuilder mailBodyTmp1 = new StringBuilder();

                        mailBody.Append("Dear Sir,");
                        mailBodyTmp1.Append("<br><br><b>New TLV Request for approval details are follows: <b/>");
                        mailBodyTmp1.Append("<br /><br /><table style='width: 80%; border-collapse:collapse; ' > "
                                            + "<tr style=' font-size:  12px;font-weight:bold;background-color:#5DADE2;color:#000000;' >"
                                            + "<td style=' border: 1px solid #111111; text-align:center; width:5%; padding: 10px 5px;' >"
                                            + "Region"
                                            + "</td>"
                                            + "<td style=' border:   1px solid #111111; text-align:center; width:15%; padding: 10px 5px;' >"
                                            + "Depot"
                                            + "</td>"
                                            + "<td style=' border:   1px solid #111111; text-align:center; width:20%; padding: 10px 5px;' >"
                                            + "Dealer"
                                            + "</td>"
                                            + "<td style=' border:  1px solid #111111; text-align:center; width:20%;padding: 10px 5px;' >"
                                            + "Customer Name"
                                            + "</td>"
                                            + "<td  style=' border:   1px solid #111111; text-align:center; width:10%; padding: 10px 5px;' >"
                                            + "Proposed TLV"
                                            + "</td>"
                                            + "<td  style=' border: 1px solid #111111; text-align:center; width:10%; padding: 10px 5px;' >"
                                            + "Created On"
                                            + "</td>"
                                            + "<td  style=' border: 1px solid #111111; text-align:center; width:20%; padding: 10px 5px;' >"
                                            + "Status"
                                            + "</td>"
                                            + "</tr>"
                        );
                        var Style = string.Empty;
                        var styleCenter = string.Empty;

                        Style = "font-weight:normal;border:1px solid #111111;text-align:left;padding:5px 3px;";
                        styleCenter = "font-weight:normal;border:1px solid #111111;text-align:center;padding:5px 3px;";
                        dt.AsEnumerable().ToList().ForEach(dr =>
                        {
                            mailBodyTmp1.Append("<tr style='font-size:11px;" +
                                                (dr["mail_type"].ToString() == "REJECTED" ? "color: #bf0000;" : "") +
                                                "' >"
                                                + "<td style='" + styleCenter + " ' >"
                                                + dr["depot_regn"].ToString()
                                                + "</td>"
                                                + "<td style=' " + Style + " ' >"
                                                + dr["depot_name"].ToString()
                                                + "</td>"
                                                + "<td style=' " + Style + " ' >"
                                                + dr["dealer_name"].ToString()
                                                + "</td>"
                                                + "<td style=' " + Style + " ' >"
                                                + dr["customer_name"].ToString()
                                                + "</td>"
                                                + "<td style=' " + styleCenter + " ' >"
                                                + dr["proposed_tlv"].ToString()
                                                + "</td>"
                                                + "<td style=' " + styleCenter + " ' >"
                                                + dr["created_on"].ToString()
                                                + "</td>"
                                                + "<td style=' " + styleCenter + " ' >"
                                                + dr["status_value"].ToString()
                                                + "</td>"
                                                + "</tr>"
                            );
                        });
                            
                        mailBodyTmp1.Append("</table>");
                        mailBody.Append(mailBodyTmp1.ToString());
                        mailBody.Append("<br/><br /><br />"
                                        + "<strong>PROTECTON APP Admin</strong><br /><br /><hr>"
                                        + "<div style='font-size:10px;font-weight:normal;'><strong>Disclaimer:-</strong> This is a system generated email. Please do not reply to this email.<br />"
                                        + "*** This message is intended only for the person or entity to which it is addressed and may contain confidential and/or privileged information. If you have received this message in error, please notify the sender immediately and delete this message from your system ***</div>"
                        );

                        foreach (var dr in dt1.Rows)
                        {
                            //EmailSMSsender mailobj = new EmailSMSsender();
                            //MailEntity mailEntity = new MailEntity();
                            //mailEntity.ToAddress = dr("to_address").ToString();
                            //mailEntity.CCAddress = dr("cc_address").ToString();
                            //mailEntity.BCCAddress = dr("bcc_address").ToString();
                            //mailEntity.MailSubject = "New TLV for Approval as on " + DateTime.Now.ToString("dd/MM/yyyy");
                            //mailEntity.MailBody = mailBody.ToString();
                            //mailEntity.Sender_Task = "btnSubmit_Click - TlvRevisionRequestDetails";
                            //mailobj.sendMail(mailEntity);
                        }
                    }
                }

                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        #endregion
    }
}
