using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Filters;
using BERGER_ONE_PORTAL_API.Logic;
using BERGER_ONE_PORTAL_API.Logic.Protecton;
using BERGER_ONE_PORTAL_API.Models.Protecton;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace BERGER_ONE_PORTAL_API.Controllers.Protecton
{
    [Route(Constant.Common.PortalAPIPrefix + "[controller]/[action]")]
    [ApiController]
    [Authorize]
    [ServiceFilter(typeof(FluentValidationActionFilterAttribute))]
    [ServiceFilter(typeof(ErrorHandlerFilterAttribute))]
    [ServiceFilter(typeof(APILogAttribute))]
    public class EpcaController : ControllerBase
    {

        private readonly IEpcaLogic _ePcaLogic;

        public EpcaController(IEpcaLogic ePcaLogic) { _ePcaLogic = ePcaLogic; }

        #region "EPCA MODULE"
        // COMMON DETAILS BIND
        [HttpPost]
        public async Task<EpcaStatusResponseDto?> GetPcaStatusList([FromBody] pcaStatusRequestDto dto) => await _ePcaLogic.GetPcaStatusList(dto);

        [HttpPost]
        public async Task<EpcaDealersResponseDto?> GetPcaDealersList([FromBody] pcaDealersRequestDto dto) => await _ePcaLogic.GetPcaDealersList(dto);

        [HttpPost]
        public async Task<EpcaPrjoctResponseDto?> GetPcaProjectListByDepotTerr([FromBody] pcaProjectRequestDto dto) => await _ePcaLogic.GetPcaProjectListByDepotTerr(dto);

        [HttpPost]
        public async Task<EpcaResponseDto?> GetSKUList([FromBody] GetSKUListRequestDto dto) => await _ePcaLogic.GetSKUList(dto);

        [HttpPost]
        public async Task<EpcaBillToResponseDto?> GetPcaBillToList([FromBody] GetBillToRequestDto dto) => await _ePcaLogic.GetPcaBillToList(dto);

        [HttpPost]
        public async Task<EpcaFactoryResponseDto?> GetFactoryListBySKU([FromBody] GetFactoryRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetFactoryListBySKU(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaResponseDto?> GetePCADetailsView([FromBody] ePCADetailsViewRequestDto dto) => await _ePcaLogic.GetePCADetailsView(dto);

        [HttpPost]
        public async Task<PcaInsertResponseDto?> PcaApprovalDetailsSubmit([FromBody] PcaApprovalInsertRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.PcaApprovalDetailsSubmit(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaMinRateResponseDto?> GetPcaMinRateBySku_Vr1([FromBody] GetMinRateBySkuRequestDto dto) => await _ePcaLogic.GetPcaMinRateBySku_Vr1(dto);

        [HttpPost]
        public async Task<PcaDeleteResponseDto?> DeletePcaDetails([FromBody] DeletePCARequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.DeletePcaDetails(dto, userDetails.user_id);
        }
        // ===============================================================================


        // EPCA LIST AND ENTRY
        [HttpPost]
        public async Task<EpcaResponseDto?> GetPcaList([FromBody] GetePCAListRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetPcaList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<PcaInsertResponseDto?> InsertePcaDetails_Vr1([FromBody] PcaInsertRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.InsertePcaDetails_Vr1(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaDetailsStatusResponseDto?> PcaDetailsGetStatus([FromBody] GetPcaDetailsStatusRequestDto dto) => await _ePcaLogic.PcaDetailsGetStatus(dto);

        [HttpPost]
        public async Task<EpcaDetailsGetListResponseDto?> PcaDetailsGetDtl([FromBody] GetPcaDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.PcaDetailsGetDtl(dto, userDetails.user_id);
        }
        // ===============================================================================


        // EPCA DEPOT LIST AND ENTRY -- (APPROVAL)
        [HttpPost]
        public async Task<EpcaResponseDto?> GetePCADepotApprovalList([FromBody] GetePCADepotApprovalListRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetePCADepotApprovalList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaResponseDto?> GetePCADepotApprovalDetails([FromBody] GetePCADepotApprovalDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetePCADepotApprovalDetails(dto, userDetails.user_id);
        }
        // ===============================================================================


        // EPCA RSM LIST AND ENTRY -- (APPROVAL)
        [HttpPost]
        public async Task<EpcaResponseDto?> GetPcaRsmList([FromBody] GetePCAListRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetPcaRsmList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaResponseDto?> GetePCARsmApprovalDetails([FromBody] GetePCADepotApprovalDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetePCARsmApprovalDetails(dto, userDetails.user_id);
        }
        // ===============================================================================


        // EPCA HO LIST AND ENTRY -- (APPROVAL)
        [HttpPost]
        public async Task<EpcaResponseDto?> GetePCAHoApprovalList([FromBody] GetePCADepotApprovalDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetePCAHoApprovalList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaResponseDto?> GetePCAHoApprovalDetails([FromBody] GetePCADepotApprovalDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetePCAHoApprovalDetails(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaResponseDto?> GetEpcaGpGcRateDtls([FromBody] PcaGpGcRateRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetEpcaGpGcRateDtls(dto, userDetails.user_id);
        }
        // ===============================================================================


        // EPCA CANCELLATION LIST AND ENTRY -- (APPROVAL)
        [HttpPost]
        public async Task<EpcaCancellationGetListResponseDto?> PcaCancellationGetList([FromBody] PcaCancellationRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.PcaCancellationGetList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<PcaCancleResponseDto?> PcaCancellationUpdate([FromBody] CanclePcaRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.PcaCancellationUpdate(dto, userDetails.user_id);
        }
        // ===============================================================================
        #endregion
        

        #region "TLV MODULE"
        // CREATED BY SOUMYA SHUBHRA ROY -- 20-08-2024
        [HttpPost]
        public async Task<EpcaResponseDto?> GetTlvRevisionList([FromBody] GetePCAListRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetTlvRevisionList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaStatusResponseDto?> GetTlvStatusList([FromBody] TlvStatusRequestDto dto) => await _ePcaLogic.GetTlvStatusList(dto);

        [HttpPost]
        public async Task<EpcaResponseDto?> GetTlvRSMApprovalList([FromBody] TlvRSMApprovalRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetTlvRSMApprovalList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaResponseDto?> GetTlvRevisionLogDetails([FromBody] TlvRevisionLogRequestDto dto) => await _ePcaLogic.GetTlvRevisionLogDetails(dto);

        [HttpPost]
        public async Task<TlvRevisionResponseDto?> TlvRevisionApproval([FromBody] TlvApprovalRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.TlvRevisionApproval(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaResponseDto?> GetTlvHOApprovalList([FromBody] TlvRSMApprovalRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetTlvHOApprovalList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaResponseDto?> GetTlvHoCommercialApprovalList([FromBody] TlvRSMApprovalRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetTlvHoCommercialApprovalList(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaResponseDto?> TlvGetTermDetails([FromBody] TlvTermDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.TlvGetTermDetails(dto, userDetails.user_id);
        }

        [HttpPost]
        public async Task<ResponseDto<long>> TlvDetailsSubmit([FromBody] TlvDetailsSubmitRequestDto requestDto)
        {
            requestDto.UserId ??= CommonHelper.GetUserDetailsFromClaims(User)?.user_id;
            return await _ePcaLogic.TlvDetailsSubmit(requestDto);
        }
        #endregion
    }
}
