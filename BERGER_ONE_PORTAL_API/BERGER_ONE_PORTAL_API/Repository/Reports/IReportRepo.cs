using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using System.Data;

namespace BERGER_ONE_PORTAL_API.Repository.Reports
{
    public interface IReportRepo
    {
        Task<FilePathResponse> ExportExcelReport(DataSet ds, string _reportType);
    }
}
