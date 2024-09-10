using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;

namespace BERGER_ONE_PORTAL_API.Repository.Protecton
{
    public interface IEpcaRepo
    {
        Task<MSSQLResponse?> GetPcaStatusList(pcaStatusRequestDto dto);
        Task<MSSQLResponse?> GetePCAList(GetePCAListRequestDto request, string user_id);
        Task<MSSQLResponse?> GetPcaDealersList(pcaDealersRequestDto dto);
        Task<MSSQLResponse?> GetPcaProjectListByDepotTerr(pcaProjectRequestDto dto);
        Task<MSSQLResponse?> GetSKUList(GetSKUListRequestDto dto);
        Task<MSSQLResponse?> GetPcaBillToList(GetBillToRequestDto dto);
        Task<MSSQLResponse?> GetFactoryListBySKU(GetFactoryRequestDto dto, string User_id);
        Task<MSSQLResponse?> GetPcaMinRateBySku_Vr1(GetMinRateBySkuRequestDto dto);
        Task<MSSQLResponse> InsertePcaDetails_Vr1(PcaInsertRequestDto request, string User_id);
        Task<MSSQLResponse?> PcaDetailsGetStatus(GetPcaDetailsStatusRequestDto dto);
        Task<MSSQLResponse?> PcaDetailsGetDtl(GetPcaDetailsRequestDto dto, string User_id);
        Task<MSSQLResponse> DeletePcaDetails(DeletePCARequestDto request, string User_id);
        Task<MSSQLResponse?> PcaCancellationGetList(PcaCancellationRequestDto dto, string User_id);
        Task<MSSQLResponse> PcaCancellationUpdate(CanclePcaRequestDto request, string User_id);
        Task<MSSQLResponse?> GetePCADepotApprovalList(GetePCADepotApprovalListRequestDto request, string user_id);
        Task<MSSQLResponse?> GetePCADepotApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id);
        Task<MSSQLResponse?> GetePCADetailsView(ePCADetailsViewRequestDto dto);
        Task<MSSQLResponse> PcaApprovalDetailsSubmit(PcaApprovalInsertRequestDto request, string User_id);
        Task<MSSQLResponse?> GetePCARsmApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id);
        Task<MSSQLResponse?> GetePCAHoApprovalList(GetePCADepotApprovalDetailsRequestDto request, string user_id);
        Task<MSSQLResponse?> GetePCAHoApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id);

        #region "TLV MODULE"
        // CREATED BY SOUMYA SHUBHRA ROY -- 20-08-2024
        Task<MSSQLResponse?> GetTlvRevisionList(GetePCAListRequestDto request, string user_id);
        Task<MSSQLResponse?> GetTlvStatusList(TlvStatusRequestDto request);
        Task<MSSQLResponse?> GetTlvRSMApprovalList(TlvRSMApprovalRequestDto request, string user_id);
        Task<MSSQLResponse?> GetTlvRevisionLogDetails(TlvRevisionLogRequestDto request);
        Task<MSSQLResponse> TlvRevisionApproval(TlvApprovalRequestDto request, string User_id);
        Task<MSSQLResponse?> GetTlvHOApprovalList(TlvRSMApprovalRequestDto request, string user_id);
        Task<MSSQLResponse?> GetTlvHoCommercialApprovalList(TlvRSMApprovalRequestDto request, string user_id);
        Task<MSSQLResponse?> TlvGetTermDetails(TlvTermDetailsRequestDto request, string user_id);
        #endregion
    }
}
