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
    public class EpcaLogic:IEpcaLogic
    {
        public IEpcaRepo _epcaRepo;
        private readonly IJwtManager _jwtManager;
        public EpcaLogic(IEpcaRepo epcaRepo, IJwtManager jwtManager)
        {
            _epcaRepo = epcaRepo;
            _jwtManager = jwtManager;
        }


        public async Task<EpcaStatusResponseDto?> GetPcaStatusList(pcaStatusRequestDto request)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetPcaStatusList(request);
            return EpcaAdapter.MapPcaStatusResponse(dataResponse);
        }

        public async Task<EpcaResponseDto?> GetePCAList(GetePCAListRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _epcaRepo.GetePCAList(request, user_id);
            return EpcaAdapter.MapEpcaListResponse(dataResponse);
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
        #endregion
    }
}
