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
    }
}
