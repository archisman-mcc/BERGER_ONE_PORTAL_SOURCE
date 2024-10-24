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
    public class LegalLogic : ILegalLogic
    {
        public ILegalRepo _legalRepo;
        private readonly IJwtManager _jwtManager;
        private readonly ICommonProxy _commonProxy;

        public LegalLogic(ILegalRepo legalRepo, IJwtManager jwtManager, ICommonProxy commonProxy)
        {
            _legalRepo = legalRepo;
            _jwtManager = jwtManager;
            _commonProxy = commonProxy;
        }

        public async Task<LegalResponseDto?> GetLegalOutStandingApprovalList(LegalOutStandingRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _legalRepo.GetLegalOutStandingApprovalList(request, user_id);
            return LegalAdapter.MapLegalOutStandingResponse(dataResponse);
        }

    }
}
