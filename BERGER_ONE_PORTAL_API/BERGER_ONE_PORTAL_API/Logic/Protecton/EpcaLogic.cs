using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Logic.Protecton.Adapter;
using BERGER_ONE_PORTAL_API.Repository.Common;
using BERGER_ONE_PORTAL_API.Repository.JWT;
using BERGER_ONE_PORTAL_API.Repository.Protecton;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public class EpcaLogic : IEpcaLogic
    {
        public IEpcaRepo _epcaRepo;
        private readonly IJwtManager _jwtManager;
        public EpcaLogic(IEpcaRepo epcaRepo, IJwtManager jwtManager)
        {
            _epcaRepo = epcaRepo;
            _jwtManager = jwtManager;
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

        //public async Task<PcaInsertResponseDto?> PcaApprovalDetailsSubmit(PcaApprovalInsertRequestDto request, string User_id)
        //{
        //    MSSQLResponse? dataResponse = await _epcaRepo.PcaApprovalDetailsSubmit(request, User_id);
        //    return EpcaAdapter.MapPcaInsertResponse(dataResponse);
        //}

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
        public async Task<EpcaResponseDto?> GetePCAHoApprovalDetails(GetePCADepotApprovalDetailsRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCAHoApprovalDetails(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetePCAHoApprovalList(GetePCADepotApprovalDetailsRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCAHoApprovalList(request, user_id);
            return EpcaAdapter.MapEpcaDynamicResponse(dataResponse);
        }
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
        #endregion
    }
}
