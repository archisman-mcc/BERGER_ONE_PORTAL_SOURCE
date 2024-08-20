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

        [HttpPost]
        public async Task<EpcaStatusResponseDto?> GetPcaStatusList([FromBody] pcaStatusRequestDto dto) => await _ePcaLogic.GetPcaStatusList(dto);

        [HttpPost]
        public async Task<EpcaResponseDto?> GetePCAList([FromBody] GetePCAListRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.GetePCAList(dto, userDetails.user_id);
        }

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
        public async Task<EpcaMinRateResponseDto?> GetPcaMinRateBySku_Vr1([FromBody] GetMinRateBySkuRequestDto dto) => await _ePcaLogic.GetPcaMinRateBySku_Vr1(dto);

        [HttpPost]
        public async Task<PcaInsertResponseDto?> InsertePcaDetails_Vr1([FromBody] PcaInsertRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.InsertePcaDetails_Vr1(dto,userDetails.user_id);
        }

        [HttpPost]
        public async Task<EpcaDetailsStatusResponseDto?> PcaDetailsGetStatus([FromBody] GetPcaDetailsStatusRequestDto dto) => await _ePcaLogic.PcaDetailsGetStatus(dto);

        [HttpPost]
        public async Task<EpcaDetailsGetListResponseDto?> PcaDetailsGetDtl([FromBody] GetPcaDetailsRequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.PcaDetailsGetDtl(dto, userDetails.user_id);

        }

        [HttpPost]
        public async Task<PcaDeleteResponseDto?> DeletePcaDetails([FromBody] DeletePCARequestDto dto)
        {
            var userDetails = CommonHelper.GetUserDetailsFromClaims(User);
            return await _ePcaLogic.DeletePcaDetails(dto, userDetails.user_id);
        }

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
    }
}
