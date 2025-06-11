using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Logic.Protecton.Adapter;
using BERGER_ONE_PORTAL_API.Proxy;
using BERGER_ONE_PORTAL_API.Repository.JWT;
using BERGER_ONE_PORTAL_API.Repository.Protecton;
using Azure.Core;
using BERGER_ONE_PORTAL_API.Repository.Reports;
using BERGER_ONE_PORTAL_API.Logic.Adapters;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Data;
using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Core;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using BERGER_ONE_PORTAL_API.Repository.Utility;

namespace BERGER_ONE_PORTAL_API.Logic
{
    public class ReportLogic : IReportLogic
    {
        public readonly ILegalRepo _legalRepo;
        public readonly IReportRepo _reportRepo;

        public ReportLogic(ILegalRepo legalRepo, IReportRepo reportRepo)
        {
            _legalRepo = legalRepo;
            _reportRepo = reportRepo;
        }

        #region "FOR EXCEL REPORT API"
        public async Task<FilePathResponse?> LegalCaseApprovalAsmReport(LegalOutStandingRequestDto request, string user_id)
        {
            MSSQLResponse? dataResponse = await _legalRepo.GetLegalOutStandingApprovalList(request, user_id);
            return ReportAdapter.MapLegalOutStandingResponse(dataResponse);
        }

        //public async Task<IActionResult?> GetLegalCaseApprovalAsmReport(GetLegalOutStandingRequest request)
        public async Task<IActionResult?> GetLegalCaseApprovalAsmReport(LegalOutStandingRequestDto request)
        {
            var dataResponse = await _legalRepo.GetLegalOutStandingApprovalList(request, request.UspUserId);
            //var dataResponse = await _legalRepo.GetLegalOutStandingApprovalList_V1(request);
            if (dataResponse?.Data == null || dataResponse?.Data is not DataSet) return new NotFoundResult();
            if (dataResponse?.Data is not DataSet ds || !ds.HasData(ds.Tables.Count)) return new NotFoundResult();
            var fileData = ReportAdapter.ExportToExcelSheetLegalOutStanding(new ReportRequest()
            {
                Data = ds,
                FileName = "",
                Reportname = "Legal Notice Approval Protecton Report",
                TableIndex = 0
            });
            if (fileData is { Length: > 0 }) return new FileContentResult(fileData, new MediaTypeWithQualityHeaderValue("application/octet").MediaType!);
            return new NotFoundResult();
        }
        #endregion

        #region "FOR PDF REPORT API"
        #endregion
    }
}
