using BERGER_ONE_PORTAL_API.Dtos.RequestDto;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using Microsoft.AspNetCore.Mvc;

namespace BERGER_ONE_PORTAL_API.Logic
{
    public interface IReportLogic
    {
        #region "FOR EXCEL REPORT API"
        Task<FilePathResponse?> LegalCaseApprovalAsmReport(LegalOutStandingRequestDto request, string user_id);

        Task<IActionResult?> GetLegalCaseApprovalAsmReport(LegalOutStandingRequestDto request);
        #endregion

        #region "FOR PDF REPORT API"
        #endregion
    }
}
