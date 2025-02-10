using System.Data;
using System.Net;
using System.Text;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Enums;
using BERGER_ONE_PORTAL_API.Exceptions;
using BERGER_ONE_PORTAL_API.Extensions;
using BERGER_ONE_PORTAL_API.Logic.Protecton.Adapter;
using BERGER_ONE_PORTAL_API.Proxy;
using BERGER_ONE_PORTAL_API.Repository.JWT;
using BERGER_ONE_PORTAL_API.Repository.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public class EpcaLogic : IEpcaLogic
    {
        public IEpcaRepo _epcaRepo;
        private readonly IJwtManager _jwtManager;
        private readonly ICommonProxy _commonProxy;

        public EpcaLogic(IEpcaRepo epcaRepo, IJwtManager jwtManager, ICommonProxy commonProxy)
        {
            _epcaRepo = epcaRepo;
            _jwtManager = jwtManager;
            _commonProxy = commonProxy;
        }

        #region "EPCA MODULE"
        // COMMON DETAILS BIND
        public async Task<EpcaStatusResponseDto?> GetPcaStatusList(pcaStatusRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaStatusList(request);
            return EpcaAdapter.MapPcaStatusResponse(dataResponse);
        }

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

        public async Task<EpcaResponseDto?> GetePCADetailsView(ePCADetailsViewRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCADetailsView(request);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<PcaInsertResponseDto?> PcaApprovalDetailsSubmit(PcaApprovalInsertRequestDto request, string User_id) => EpcaAdapter.MapPcaInsertResponse(await _epcaRepo.PcaApprovalDetailsSubmit(request, User_id));

        public async Task<EpcaMinRateResponseDto?> GetPcaMinRateBySku_Vr1(GetMinRateBySkuRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaMinRateBySku_Vr1(request);
            return EpcaAdapter.MapSkuMinRateResponse(dataResponse);
        }

        public async Task<PcaDeleteResponseDto?> DeletePcaDetails(DeletePCARequestDto request, string User_id)
        {

            MSSQLResponse? dataResponse = await _epcaRepo.DeletePcaDetails(request, User_id);
            return EpcaAdapter.MapPcaDeleteResponse(dataResponse);
        }
        // ===============================================================================


        // EPCA LIST AND ENTRY -- (APPROVAL)
        public async Task<EpcaResponseDto?> GetPcaList(GetePCAListRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaList(request, user_id);
            return EpcaAdapter.MapEpcaListResponse(dataResponse);
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
        // ===============================================================================


        // EPCA DEPOT LIST AND ENTRY -- (APPROVAL)
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
        // ===============================================================================


        // EPCA RSM LIST AND ENTRY -- (APPROVAL)
        public async Task<EpcaResponseDto?> GetPcaRsmList(GetePCAListRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaList(request, user_id);
            return EpcaAdapter.MapEpcaListResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetePCARsmApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCARsmApprovalDetails(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }
        // ===============================================================================


        // EPCA HO LIST AND ENTRY -- (APPROVAL)
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

        public async Task<EpcaResponseDto?> GetEpcaGpGcRateDtls(PcaGpGcRateRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetEpcaGpGcRateDtls(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<PcaInsertResponseDto?> PcaHoApprovalDetailsSubmit(PcaHoApprovalInsertRequestDto request, string User_id) => EpcaAdapter.MapPcaInsertResponse(await _epcaRepo.PcaHoApprovalDetailsSubmit(request, User_id));
        // ===============================================================================


        // EPCA CANCELLATION LIST AND ENTRY -- (APPROVAL)
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
		public async Task<EpcaResponseDto?> GetProjectList(GetProjectListRequestDto request, string user_id)
		{
			MSSQLResponse? dataResponse = await _epcaRepo.GetProjectList(request, user_id);
			return EpcaAdapter.MapProjectListResponse(dataResponse);
		}

		public async Task<PotentialTrackingSiteSubmit?> EPCASiteEntryLead(PotentialTrackingSiteSubmitRequestDto request, string User_id)
		{
			MSSQLResponse? dataResponse = await _epcaRepo.EPCASiteEntryLead(request, User_id);
			return EpcaAdapter.MapEPCASiteEntryLead(dataResponse);
		}

		// ===============================================================================
		#endregion


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

        public async Task<EpcaResponseDto?> GetTlvDepotApprovalList(TlvRSMApprovalRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetTlvDepotApprovalList(request, user_id);
            return EpcaAdapter.MapTlvDepotApprovalResponse(dataResponse);
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
                    requestDto.AadharDoc?.SaveBase64JpegImage(DocPathEnum.ProtectonMobAppDocsFolder, @"TLV_FILES\AADHAR\");
            
            if ((requestDto.PanDoc ?? "").Trim() != "")
                requestDto.PanDoc =
                    requestDto.PanDoc?.SaveBase64JpegImage(DocPathEnum.ProtectonMobAppDocsFolder, @"TLV_FILES\PAN\");
            
            if ((requestDto.LcbgDoc ?? "").Trim() != "")
                requestDto.LcbgDoc =
                    requestDto.LcbgDoc?.SaveBase64JpegImage(DocPathEnum.ProtectonMobAppDocsFolder, @"TLV_FILES\LC_BG\");
            
            if ((requestDto.ChequeDoc ?? "").Trim() != "")
                requestDto.ChequeDoc =
                    requestDto.ChequeDoc?.SaveBase64JpegImage(DocPathEnum.ProtectonMobAppDocsFolder, @"TLV_FILES\BLANK_CHEQUE\");
            
            if ((requestDto.FileDoc ?? "").Trim() != "")
                requestDto.FileDoc =
                    requestDto.FileDoc?.SaveBase64JpegImage(DocPathEnum.ProtectonMobAppDocsFolder, @"TLV_FILES\DOC\");

            requestDto.Status = "PENDING_DEPOT";

            var res = await _epcaRepo.TlvDetailsSubmit(requestDto);
            if (long.TryParse(
                    res.OutputParameters?.FirstOrDefault(c => c.ParameterName == "@auto_id")?.Value?.ToString(),
                    out var autoId))
            {
                if ((requestDto.AutoId ?? 0) == 0) await TlvDetailsSubmit_SendMail(autoId, "NEW_REQUEST", requestDto.UserId);

                string _message = res.OutputParameters?.FirstOrDefault(c => c.ParameterName == "@outputMsg")?.Value?.ToString();
                return new ResponseDto<long>()
                {
                    success = true,
                    statusCode = HttpStatusCode.OK,
                    //message = Constant.ResponseMsg.Success,
                    message = _message,
                    Data = autoId
                };
            }

            throw new CustomException(Constant.ResponseMsg.Failed);
        }

        private async Task TlvDetailsSubmit_SendMail(long autoId, string status, string? userId)
        {
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
                        var mailBody = new StringBuilder();
                        var mailBodyTmp1 = new StringBuilder();

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

                        var style = "font-weight:normal;border:1px solid #111111;text-align:left;padding:5px 3px;";
                        var styleCenter = "font-weight:normal;border:1px solid #111111;text-align:center;padding:5px 3px;";
                        dt.AsEnumerable().ToList().ForEach(dr =>
                        {
                            mailBodyTmp1.Append($@"<tr style='font-size:11px;{(dr.Field<string?>("mail_type")== "REJECTED" ? " color: #bf0000;" : "")}'>
                                                        <td style='{styleCenter}' >{dr.Field<string?>("depot_regn")}</td>
                                                        <td style='{style}' >{dr.Field<string?>("depot_name")}</td>
                                                        <td style='{style}' >{dr.Field<string>("dealer_name")}</td>
                                                        <td style='{style}' >{dr.Field<string?>("customer_name")}</td>
                                                        <td style='{styleCenter}' >{dr.Field<decimal?>("proposed_tlv"):0.00}</td>
                                                        <td style='{styleCenter}' >{dr.Field<string?>("created_on")}</td>
                                                        <td style='{styleCenter}' >{dr.Field<string?>("status_value")}</td>
                                                    </tr>"
                            );
                        });
                            
                        mailBodyTmp1.Append("</table>");
                        mailBody.Append(mailBodyTmp1.ToString());
                        mailBody.Append("<br/><br /><br />"
                                        + "<strong>PROTECTON APP Admin</strong><br /><br /><hr>"
                                        + "<div style='font-size:10px;font-weight:normal;'><strong>Disclaimer:-</strong> This is a system generated email. Please do not reply to this email.<br />"
                                        + "*** This message is intended only for the person or entity to which it is addressed and may contain confidential and/or privileged information. If you have received this message in error, please notify the sender immediately and delete this message from your system ***</div>"
                        );

                        var tasks = dt1.AsEnumerable().Select(dr => _commonProxy.SendMail(new MailRequest
                        {
                            MailToAddress = dr.Field<string?>("to_address"),
                            MailCCAddress = dr.Field<string?>("cc_address"),
                            MailBody = mailBody.ToString(),
                            MailSubject = $"New TLV for Approval as on {DateTime.Now:dd/MM/yyyy}",
                            MailBCCAddress = dr.Field<string?>("bcc_address"),
                            MailFromAddress = "MOBILE APP (PROTECTON) MAIL SERVICE"
                        })).ToList();
                        await Task.WhenAll(tasks);

                    }
                }

                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<EpcaResponseDto?> GetBillToDetails(TlvTermDetailsRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetBillToDetails(request);
            return EpcaAdapter.MapTlvRevisionListResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetTlvDetails(GeteTlvDetailsRequestDto request, string User_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetTlvDetails(request, User_id);
            return EpcaAdapter.MapTlvRevisionDetailsListResponse(dataResponse);
        }
        #endregion
    }
}
