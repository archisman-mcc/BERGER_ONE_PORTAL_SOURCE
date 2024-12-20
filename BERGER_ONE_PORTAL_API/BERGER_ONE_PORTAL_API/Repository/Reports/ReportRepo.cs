using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using BERGER_ONE_PORTAL_API.Logic.Adapters;
using static System.Net.Mime.MediaTypeNames;
using System.Data;
using System.Diagnostics;
using Microsoft.Extensions.Hosting;
using Azure.Core;
using Microsoft.AspNetCore.Hosting.Server;
using System.IO;
using NPOI.HSSF.UserModel;
using NPOI.SS.Formula.Functions;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace BERGER_ONE_PORTAL_API.Repository.Reports
{
    public class ReportRepo : IReportRepo
    {
        public async Task<FilePathResponse> ExportExcelReport(DataSet ds, string _reportType)
        {
            FilePathResponse response = new FilePathResponse();
            //DataSet ds = new DataSet();
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                //var applicationPath = Application.StartupPath.Replace("bin\\Debug\\net8.0-windows7.0\\", "");
                //FileStream fs = new FileStream(applicationPath + @"Templates\OWN_STOCK_EXCEL_REPORT_TEMPLATE.xlsx", FileMode.Open, FileAccess.Read);

                FileStream fs = new FileStream(@"\Reports\Templates\EXCEL\Legal_Notice_Approval_Protecton_Template.xls", FileMode.Open);
                using (StreamReader reader = new StreamReader(fs))
                {
                    string line = reader.ReadLine();
                }

                XSSFWorkbook templateWorkbook = new NPOI.XSSF.UserModel.XSSFWorkbook(fs);
                XSSFSheet sheet = (XSSFSheet)templateWorkbook.GetSheet("Sheet1");
                XSSFRow Row = (XSSFRow)sheet.GetRow(0);
                XSSFCell Cell = (XSSFCell)Row.GetCell(0);

                Cell.SetCellValue("Report As On - " + DateTime.Today.ToString("dd/MM/yyyy"));

                int SheetRowIndex = 3;

                for (var i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                {
                    Row = (XSSFRow)sheet.CreateRow(SheetRowIndex);

                    Cell = (XSSFCell)Row.CreateCell(0);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["company"]));

                    Cell = (XSSFCell)Row.CreateCell(1);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["depot_name"]));

                    Cell = (XSSFCell)Row.CreateCell(2);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["dlr_dealer_name"]));

                    Cell = (XSSFCell)Row.CreateCell(3);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["dlr_gold_silver"]));

                    Cell = (XSSFCell)Row.CreateCell(4);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["os_amt0"])); // Decimal

                    Cell = (XSSFCell)Row.CreateCell(5);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["os_amt"])); // Decimal

                    // Cell = Row.CreateCell(6)
                    // Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General")
                    // Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["os_amt1"]))

                    Cell = (XSSFCell)Row.CreateCell(6);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["os_amt2"])); // Decimal

                    Cell = (XSSFCell)Row.CreateCell(7);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["os_amt3"])); // Decimal

                    Cell = (XSSFCell)Row.CreateCell(8);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["os_amt4"])); // Decimal

                    Cell = (XSSFCell)Row.CreateCell(9);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["notice_yn_val"]));

                    Cell = (XSSFCell)Row.CreateCell(10);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["notice_desc"]));

                    Cell = (XSSFCell)Row.CreateCell(11);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["notice_yn_ho_val"]));

                    Cell = (XSSFCell)Row.CreateCell(12);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["notice_desc_ho"]));

                    Cell = (XSSFCell)Row.CreateCell(13);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["os_amt_updt"])); // Decimal

                    Cell = (XSSFCell)Row.CreateCell(14);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["amt_received"])); // Decimal

                    Cell = (XSSFCell)Row.CreateCell(15);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["legal_status"]));

                    Cell = (XSSFCell)Row.CreateCell(16);
                    Cell.CellStyle.DataFormat = HSSFDataFormat.GetBuiltinFormat("General");
                    Cell.SetCellValue(Convert.ToString(ds.Tables[0].Rows[i]["NoofVisit"]));

                    SheetRowIndex = SheetRowIndex + 1;
                }

                //string genReportPath = @"C:\Users\Administrator\Downloads\STORE_POS\Excel_Reports\";
                //string genReportPath = GlobalVar.DOWNLOAD_PATH + @"\Excel_Reports\";
                string genReportPath = @"D:\ALL_REPORTS\Downloads\BERGER_ONE\EXCEL_REPORTS\LEGAL\";

                if (!(Directory.Exists(genReportPath)))
                    Directory.CreateDirectory(genReportPath);

                string fileName = "LegalCaseApprovalASM_Protecton_" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm") + ".xlsx";
                response.Data = genReportPath + fileName;
                FileStream fl = new FileStream(genReportPath + fileName, FileMode.Create);
                templateWorkbook.Write(fl);
                fl.Close();
                //fl.Flush();
            }

            return response;
        }
    }
}
