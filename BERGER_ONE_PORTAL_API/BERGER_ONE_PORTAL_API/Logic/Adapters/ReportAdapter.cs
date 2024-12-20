using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using System.Data;
using System.Net;
using NPOI.HSSF.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using System.Globalization;
using Azure;

namespace BERGER_ONE_PORTAL_API.Logic.Adapters
{
    public class ReportAdapter
    {
        public static FilePathResponse MapLegalOutStandingResponse(MSSQLResponse? data)
        {
            FilePathResponse? response = null;
            try
            {
                if (data != null)
                {
                    if (data != null && data.Data != null)
                    {
                        var ds = (data?.Data as DataSet);
                        if (ds != null && ds.Tables.Count > 0)
                        {
                            response = new FilePathResponse();

                            if (ds != null && ds.Tables[0].Rows.Count > 0)
                            {
                                FileStream fs = new FileStream(AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\Debug\\net8.0\\", "") + @"\Reports\Templates\EXCEL\Legal_Notice_Approval_Protecton_Template.xls", FileMode.Open, FileAccess.Read);

                                HSSFWorkbook templateWorkbook = new HSSFWorkbook(fs);
                                HSSFSheet sheet = (HSSFSheet)templateWorkbook.GetSheet("Sheet1");
                                HSSFRow Row = (HSSFRow)sheet.GetRow(0);
                                HSSFCell Cell = (HSSFCell)Row.GetCell(0);

                                Cell.SetCellValue("Report As On - " + DateTime.Today.ToString("dd/MM/yyyy"));

                                int SheetRowIndex = 3;

                                for (var i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                                {
                                    Row = (HSSFRow)sheet.CreateRow(SheetRowIndex);

                                    Cell = (HSSFCell)Row.CreateCell(0);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["company"]));

                                    Cell = (HSSFCell)Row.CreateCell(1);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["depot_name"]));

                                    Cell = (HSSFCell)Row.CreateCell(2);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["dlr_dealer_name"]));

                                    Cell = (HSSFCell)Row.CreateCell(3);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["dlr_gold_silver"]));

                                    Cell = (HSSFCell)Row.CreateCell(4);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    //Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["os_amt0"])); // Decimal
                                    Cell.SetCellValue(Convert.ToDouble(ds.Tables[0].Rows[i]["os_amt0"])); // Decimal

                                    Cell = (HSSFCell)Row.CreateCell(5);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToDouble(ds.Tables[0].Rows[i]["os_amt"])); // Decimal

                                    Cell = (HSSFCell)Row.CreateCell(6);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToDouble(ds.Tables[0].Rows[i]["os_amt2"])); // Decimal

                                    Cell = (HSSFCell)Row.CreateCell(7);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToDouble(ds.Tables[0].Rows[i]["os_amt3"])); // Decimal

                                    Cell = (HSSFCell)Row.CreateCell(8);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToDouble(ds.Tables[0].Rows[i]["os_amt4"])); // Decimal

                                    Cell = (HSSFCell)Row.CreateCell(9);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["notice_yn_val"]));

                                    Cell = (HSSFCell)Row.CreateCell(10);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["notice_desc"]));

                                    Cell = (HSSFCell)Row.CreateCell(11);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["notice_yn_ho_val"]));

                                    Cell = (HSSFCell)Row.CreateCell(12);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["notice_desc_ho"]));

                                    Cell = (HSSFCell)Row.CreateCell(13);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToDouble(ds.Tables[0].Rows[i]["os_amt_updt"])); // Decimal

                                    Cell = (HSSFCell)Row.CreateCell(14);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToDouble(ds.Tables[0].Rows[i]["amt_received"])); // Decimal

                                    Cell = (HSSFCell)Row.CreateCell(15);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["legal_status"]));

                                    Cell = (HSSFCell)Row.CreateCell(16);
                                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["NoofVisit"]));

                                    SheetRowIndex = SheetRowIndex + 1;
                                }

                                string genReportPath = @"D:\ALL_REPORTS\Downloads\BERGER_ONE\EXCEL_REPORTS\LEGAL\";
                                if (!(Directory.Exists(genReportPath)))
                                    Directory.CreateDirectory(genReportPath);

                                string fileName = "LegalCaseApprovalASM_Protecton_" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm") + ".xls";
                                response.Data = genReportPath + fileName;
                                response.success = true;
                                response.message = "Success";
                                response.statusCode = HttpStatusCode.OK;

                                FileStream fl = new FileStream(genReportPath + fileName, FileMode.Create);
                                templateWorkbook.Write(fl);
                                fl.Close();
                            }
                        }
                        else
                        {
                            response.Data = null;
                            response.success = false;
                            response.message = "No Content";
                            response.statusCode = HttpStatusCode.NoContent;
                        }
                    }
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = "Data Access Response is null or empty";
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.success = false;
                response.message = ex.Message;
                response.statusCode = HttpStatusCode.InternalServerError;
            }
            return response;
        }

        public static byte[]? ExportToExcelSheetLegalOutStanding(ReportRequest dto)
        {
            using var ms = new MemoryStream();
            FileStream fs = new FileStream(AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\Debug\\net8.0\\", "") + @"\Reports\Templates\EXCEL\Legal_Notice_Approval_Protecton_Template.xls", FileMode.Open, FileAccess.Read);

            HSSFWorkbook templateWorkbook = new HSSFWorkbook(fs);

            if (dto?.Data is not { Tables.Count: > 0 }) return null;
            if (dto?.Data != null && dto.Data.Tables[0].Rows.Count > 0)
            {
                HSSFSheet sheet = (HSSFSheet)templateWorkbook.GetSheet("Sheet1");
                HSSFRow Row = (HSSFRow)sheet.GetRow(0);
                HSSFCell Cell = (HSSFCell)Row.GetCell(0);

                Cell.SetCellValue("Report As On - " + DateTime.Today.ToString("dd/MM/yyyy"));

                int SheetRowIndex = 3;

                for (var i = 0; i <= dto.Data.Tables[0].Rows.Count - 1; i++)
                {
                    Row = (HSSFRow)sheet.CreateRow(SheetRowIndex);

                    Cell = (HSSFCell)Row.CreateCell(0);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(dto.Data.Tables[0].Rows[i]["company"]));

                    Cell = (HSSFCell)Row.CreateCell(1);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(dto.Data.Tables[0].Rows[i]["depot_name"]));

                    Cell = (HSSFCell)Row.CreateCell(2);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(dto.Data.Tables[0].Rows[i]["dlr_dealer_name"]));

                    Cell = (HSSFCell)Row.CreateCell(3);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(dto.Data.Tables[0].Rows[i]["dlr_gold_silver"]));

                    Cell = (HSSFCell)Row.CreateCell(4);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    //Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["os_amt0"])); // Decimal
                    Cell.SetCellValue(Convert.ToDouble(dto.Data.Tables[0].Rows[i]["os_amt0"])); // Decimal

                    Cell = (HSSFCell)Row.CreateCell(5);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToDouble(dto.Data.Tables[0].Rows[i]["os_amt"])); // Decimal

                    Cell = (HSSFCell)Row.CreateCell(6);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToDouble(dto.Data.Tables[0].Rows[i]["os_amt2"])); // Decimal

                    Cell = (HSSFCell)Row.CreateCell(7);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToDouble(dto.Data.Tables[0].Rows[i]["os_amt3"])); // Decimal

                    Cell = (HSSFCell)Row.CreateCell(8);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToDouble(dto.Data.Tables[0].Rows[i]["os_amt4"])); // Decimal

                    Cell = (HSSFCell)Row.CreateCell(9);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(dto.Data.Tables[0].Rows[i]["notice_yn_val"]));

                    Cell = (HSSFCell)Row.CreateCell(10);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(dto.Data.Tables[0].Rows[i]["notice_desc"]));

                    Cell = (HSSFCell)Row.CreateCell(11);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(dto.Data.Tables[0].Rows[i]["notice_yn_ho_val"]));

                    Cell = (HSSFCell)Row.CreateCell(12);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(dto.Data.Tables[0].Rows[i]["notice_desc_ho"]));

                    Cell = (HSSFCell)Row.CreateCell(13);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToDouble(dto.Data.Tables[0].Rows[i]["os_amt_updt"])); // Decimal

                    Cell = (HSSFCell)Row.CreateCell(14);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToDouble(dto.Data.Tables[0].Rows[i]["amt_received"])); // Decimal

                    Cell = (HSSFCell)Row.CreateCell(15);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(dto.Data.Tables[0].Rows[i]["legal_status"]));

                    Cell = (HSSFCell)Row.CreateCell(16);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(dto.Data.Tables[0].Rows[i]["NoofVisit"]));

                    SheetRowIndex = SheetRowIndex + 1;
                }

                string genReportPath = @"D:\ALL_REPORTS\Downloads\BERGER_ONE\EXCEL_REPORTS\LEGAL\";
                if (!(Directory.Exists(genReportPath)))
                    Directory.CreateDirectory(genReportPath);

                string fileName = "LegalCaseApprovalASM_Protecton_" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm") + ".xls";;
            }
            templateWorkbook.Write(ms);
            var fileBytes = ms.ToArray();
            return fileBytes;
        }
    }
}
