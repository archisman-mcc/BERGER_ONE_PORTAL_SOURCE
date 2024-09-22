using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public interface IEpcaLogic
    {
        #region "EPCA MODULE"
        Task<EpcaStatusResponseDto?> GetPcaStatusList(pcaStatusRequestDto request);
        Task<EpcaDealersResponseDto?> GetPcaDealersList(pcaDealersRequestDto request);
        Task<EpcaPrjoctResponseDto?> GetPcaProjectListByDepotTerr(pcaProjectRequestDto request);
        Task<EpcaResponseDto?> GetSKUList(GetSKUListRequestDto request);
        Task<EpcaBillToResponseDto?> GetPcaBillToList(GetBillToRequestDto request);
        Task<EpcaFactoryResponseDto?> GetFactoryListBySKU(GetFactoryRequestDto request, string User_id);
        Task<EpcaResponseDto?> GetePCADetailsView(ePCADetailsViewRequestDto request);
        Task<PcaInsertResponseDto?> PcaApprovalDetailsSubmit(PcaApprovalInsertRequestDto request, string User_id);
        Task<EpcaMinRateResponseDto?> GetPcaMinRateBySku_Vr1(GetMinRateBySkuRequestDto request);
        Task<PcaDeleteResponseDto?> DeletePcaDetails(DeletePCARequestDto request, string User_id);
        Task<EpcaResponseDto?> GetPcaList(GetePCAListRequestDto request, string user_id);
        Task<PcaInsertResponseDto?> InsertePcaDetails_Vr1(PcaInsertRequestDto request, string User_id);
        Task<EpcaDetailsStatusResponseDto?> PcaDetailsGetStatus(GetPcaDetailsStatusRequestDto request);
        Task<EpcaDetailsGetListResponseDto?> PcaDetailsGetDtl(GetPcaDetailsRequestDto request, string User_id);
        Task<EpcaResponseDto?> GetePCADepotApprovalList(GetePCADepotApprovalListRequestDto request, string user_id);
        Task<EpcaResponseDto?> GetePCADepotApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id);
        Task<EpcaResponseDto?> GetPcaRsmList(GetePCAListRequestDto request, string user_id);
        Task<EpcaResponseDto?> GetePCARsmApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id);
        Task<EpcaResponseDto?> GetePCAHoApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id);
        Task<EpcaResponseDto?> GetePCAHoApprovalList(GetePCADepotApprovalDetailsRequestDto request, string user_id);
        Task<EpcaCancellationGetListResponseDto?> PcaCancellationGetList(PcaCancellationRequestDto request, string User_id);
        Task<PcaCancleResponseDto?> PcaCancellationUpdate(CanclePcaRequestDto request, string User_id);
        #endregion


        #region "TLV MODULE"
        // CREATED BY SOUMYA SHUBHRA ROY -- 20-08-2024
        Task<EpcaResponseDto?> GetTlvRevisionList(GetePCAListRequestDto request, string user_id);
        Task<EpcaStatusResponseDto?> GetTlvStatusList(TlvStatusRequestDto request);
        Task<EpcaResponseDto?> GetTlvRSMApprovalList(TlvRSMApprovalRequestDto request, string user_id);
        Task<EpcaResponseDto?> GetTlvRevisionLogDetails(TlvRevisionLogRequestDto request);
        Task<TlvRevisionResponseDto?> TlvRevisionApproval(TlvApprovalRequestDto request, string User_id);
        Task<EpcaResponseDto?> GetTlvHOApprovalList(TlvRSMApprovalRequestDto request, string user_id);
        Task<EpcaResponseDto?> GetTlvHoCommercialApprovalList(TlvRSMApprovalRequestDto request, string user_id);
        Task<EpcaResponseDto?> TlvGetTermDetails(TlvTermDetailsRequestDto request, string user_id);
        #endregion
    }
}
