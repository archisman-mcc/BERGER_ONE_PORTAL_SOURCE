using BERGER_ONE_PORTAL_API.Common.Utility;
using BERGER_ONE_PORTAL_API.Common.Utilty;
using BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto.Protecton;
using BERGER_ONE_PORTAL_API.Proxy;
using BERGER_ONE_PORTAL_API.Repository.JWT;
using BERGER_ONE_PORTAL_API.Repository.Protecton;
using System.Data;
using System.Net;
using System.Text;

namespace BERGER_ONE_PORTAL_API.Logic.Protecton
{
    public class BillingLogic: IBillingLogic
    {
        public IBillingRepo _billingRepo;
        private readonly IJwtManager _jwtManager;
        private readonly ICommonProxy _commonProxy;
        public IEmailSMSsender _emailSMSsenderRepo;

        public BillingLogic(IBillingRepo BillingRepo, IJwtManager jwtManager, ICommonProxy commonProxy)
        {
            _billingRepo = BillingRepo;
            _jwtManager = jwtManager;
            _commonProxy = commonProxy;
        }

        public async Task<BillingResponseDto> GetBillingList(GetBillingListRequestDto requestDto, string user_id)
        {
            BillingResponseDto response = new BillingResponseDto();
            var dbResponse = await _billingRepo.GetBillingList(requestDto, user_id);
            if (dbResponse != null)
            {
                var ds = dbResponse.Data as DataSet;
                if (ds != null && ds.Tables.Count > 0)
                {
                    response.Data = ds;
                    response.success = true;
                    response.message = "Success";
                    response.statusCode = HttpStatusCode.OK;
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = Constant.ResponseMsg.NoData;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = Constant.ResponseMsg.NoData;
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }
        public async Task<BillingResponseDto> GetBillingDetails(GetBillingDetailsRequestDto requestDto, string user_id)
        {
            BillingResponseDto response = new BillingResponseDto();
            var dbResponse = await _billingRepo.GetBillingDetails(requestDto, user_id);
            if (dbResponse != null)
            {
                var ds = dbResponse.Data as DataSet;
                if (ds != null && ds.Tables.Count > 0)
                {
                    response.Data = ds;
                    response.success = true;
                    response.message = "Success";
                    response.statusCode = HttpStatusCode.OK;
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = Constant.ResponseMsg.NoData;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = Constant.ResponseMsg.NoData;
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }
        public async Task<BillingResponseDto> GetBillingTLVBalance(GetBillingTLVBalanceRequestDto requestDto, string user_id)
        {
            BillingResponseDto response = new BillingResponseDto();
            var dbResponse = await _billingRepo.GetBillingTLVBalance(requestDto, user_id);
            if (dbResponse != null)
            {
                var ds = dbResponse.Data as DataSet;
                if (ds != null && ds.Tables.Count > 0)
                {
                    response.Data = ds;
                    response.success = true;
                    response.message = "Success";
                    response.statusCode = HttpStatusCode.OK;
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = Constant.ResponseMsg.NoData;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = Constant.ResponseMsg.NoData;
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }
        public async Task<BillingResponseDto?> InsertBillingSKU(InsertBillingSKURequestDto? request, string user_id)
        {
            BillingResponseDto response = new BillingResponseDto();
            var dbResponse = await _billingRepo.InsertBillingSKU(request, user_id);
            if (dbResponse != null)
            {
                int outputCode = int.TryParse(Convert.ToString(dbResponse.OutputParameters?[0].Value), out _) ? Convert.ToInt32(dbResponse.OutputParameters?[0].Value) : -1;

                string? outputMsg = outputCode.ToString();

                if (dbResponse.RowsAffected > 0)
                {
                    GetBillingDetailsRequestDto requestDto = new GetBillingDetailsRequestDto();
                    requestDto.OrderId = outputCode;
                    SendBillingDetails(requestDto, user_id);

                    response.success = true;
                    response.message = outputMsg;
                    response.statusCode = HttpStatusCode.OK;
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = outputMsg;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = Constant.ResponseMsg.InsertFailure;
                response.statusCode = HttpStatusCode.InternalServerError;
            }
            return response;
        }
        public async Task<BillingResponseDto> SendBillingDetails(GetBillingDetailsRequestDto requestDto, string user_id)
        {
            BillingResponseDto response = new BillingResponseDto();
            var dbResponse = await _billingRepo.SendBillingDetails(requestDto, user_id);
            if (dbResponse != null)
            {
                var ds = dbResponse.Data as DataSet;
                if (ds != null && ds.Tables.Count > 1)
                {
                    for (int i = 0; i <= ds.Tables[1].Rows.Count - 1; i++)
                    {
                        StringBuilder mailBody = new StringBuilder();
                        mailBody.Append("<P><P>Dear Concern,</P> <br />The Billing for " + ds.Tables[0].Rows[0]["dealer_name"].ToString() + " has been submitted details are below: </P> <br /><br />");
                        //mailBody.Append(dtRep1RSM[0]["Rsm_Mail"].ToString());


                        mailBody.Append("<table style='border: 1px solid black;width:100%; border-collapse:collapse;' cellpadding='8'>                          <tr>" +
                            "<td style ='border :1px solid black;  width: 20%;  text-align: left; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>Region</td>" +
                            "<td style = 'border :1px solid black;  width: 30%;  text-align: left; background-color: #fff; color: #000000; font-weight: normal; padding: 5px;' > " + ds.Tables[0].Rows[0]["regn_new"] + " </td> " +
                            "<td style ='border :1px solid black;  width: 20%;  text-align: left; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>Depot</td>" +
                            "<td style ='border :1px solid black;  width: 30%;  text-align: left; background-color: #fff; color: #000000; font-weight: normal; padding: 5px;'>" + ds.Tables[0].Rows[0]["depot_name"] + "</td>" +
                            "</tr>" +
                            "<tr> " +
                            "<td style ='border :1px solid black;  width: 20%;  text-align: left; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>Dealer</td>" +
                            "<td style = 'border :1px solid black;  width: 30%;  text-align: left; background-color: #fff; color: #000000; font-weight: normal; padding: 5px;' > " + ds.Tables[0].Rows[0]["dealer_name"] + " </td> " +
                            "<td style ='border :1px solid black;  width: 20%;  text-align: left; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>Bill To</td>" +
                            "<td style ='border :1px solid black;  width: 30%;  text-align: left; background-color: #fff; color: #000000; font-weight: normal; padding: 5px;'>" + ds.Tables[0].Rows[0]["dealer_bill_to"] + "</td>" +
                            "</tr>" +
                            "<tr> " +
                            "<td style ='border :1px solid black;  width: 20%;  text-align: left; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>Project Code</td>" +
                            "<td style = 'border :1px solid black;  width: 30%;  text-align: left; background-color: #fff; color: #000000; font-weight: normal; padding: 5px;' > " + ds.Tables[0].Rows[0]["project_code"] + " </td> " +
                            "<td style ='border :1px solid black;  width: 20%;  text-align: left; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>Project Name</td>" +
                            "<td style ='border :1px solid black;  width: 30%;  text-align: left; background-color: #fff; color: #000000; font-weight: normal padding: 5px;;'>" + ds.Tables[0].Rows[0]["project_name"] + "</td>" +
                            "</tr>"
                            );
                        mailBody.Append("</table>");

                        mailBody.Append("<P><b>Product Details</b></P>");
                        mailBody.Append("<table style='border: 1px solid black;width:100%; border-collapse:collapse; margin-top: -12px;' cellpadding='8'>");
                        mailBody.Append("<tr>" +
                             "<td style ='border :1px solid black;  width: 15%;  text-align: left; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>SKU Code</td>" +
                             "<td style ='border :1px solid black;  width: 40%;  text-align: left; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>SKU Description</td>" +
                             "<td style ='border :1px solid black;  width: 15%;  text-align: right; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>NOP</td>" +
                             "<td style ='border :1px solid black;  width: 15%;  text-align: right; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>Rate/UOM</td>" +
                             "<td style ='border :1px solid black;  width: 15%;  text-align: right; background-color: #6183eb; color: #fff; font-weight: bold; padding: 5px;'>Value</td>" +
                             "</tr>"
                             );

                        for (int j = 0; j <= ds.Tables[0].Rows.Count - 1; j++)
                        {
                            mailBody.Append("<tr>" +
                           "<td style ='border :1px solid black;  width: 15%;  text-align: left; background-color: #fff; color: #000000; padding: 5px;'>" + ds.Tables[0].Rows[j]["sku_id"] + "</td>" +
                           "<td style ='border :1px solid black;  width: 40%;  text-align: left; background-color: #fff; color: #000000; padding: 5px;'>" + ds.Tables[0].Rows[j]["sku_desc"] + "</td>" +
                           "<td style ='border :1px solid black;  width: 15%;  text-align: right; background-color: #fff; color: #000000; padding: 5px;'>" + ds.Tables[0].Rows[j]["no_of_pack"] + "</td>" +
                           "<td style ='border :1px solid black;  width: 15%;  text-align: right; background-color: #fff; color: #000000; padding: 5px;'>" + ds.Tables[0].Rows[j]["approved_rate"] + "</td>" +
                           "<td style ='border :1px solid black;  width: 15%;  text-align: right; background-color: #fff; color: #000000; padding: 5px;'>" + ds.Tables[0].Rows[j]["total_amount"] + "</td>" +
                           "</tr>"
                           );
                        }
                        ;

                        mailBody.Append("</table>");

                        mailBody.Append("<br/><br /><br />"
                            + "<strong>Protecton Admin</strong><br /><br /><hr>"
                            + "<strong>Disclaimer:-</strong> This is a system generated email. Please do not reply to this email.<br />"
                            + "*** This message is intended only for the person or entity to which it is addressed and may contain confidential and/or privileged information. If you have received this message in error, please notify the sender immediately and delete this message from your system ***");


                        MailRequestDto mailReq = new MailRequestDto();
                        mailReq.mailToAddress = ds.Tables[1].Rows[i]["to_mail_address"].ToString();
                        mailReq.mailCCAddress = ds.Tables[1].Rows[i]["cc_mail_address"].ToString();
                        mailReq.mailBCCAddress = ds.Tables[1].Rows[i]["bcc_mail_address"].ToString();
                        mailReq.mailSubject = "Billing Request - " + ds.Tables[0].Rows[0]["dealer_name"].ToString();
                        mailReq.mailBody = mailBody.ToString();
                        mailReq.mailSenderApp = "BERGER ONE (PROTECTON) MAIL SERVICE";
                        mailReq.mailFromAddress = "BERGER ONE (PROTECTON) MAIL SERVICE";
                        mailReq.mailSenderTask = "BERGER ONE - Billing Request";
                        var mailResponse = new MailResponseDto();
                        mailResponse = await _emailSMSsenderRepo.SendMail(mailReq);
                    }
                    response.Data = null;
                    response.success = true;
                    response.message = "Success";
                    response.statusCode = HttpStatusCode.OK;
                }
                else
                {
                    response.Data = null;
                    response.success = false;
                    response.message = Constant.ResponseMsg.NoData;
                    response.statusCode = HttpStatusCode.NoContent;
                }
            }
            else
            {
                response.Data = null;
                response.success = false;
                response.message = Constant.ResponseMsg.NoData;
                response.statusCode = HttpStatusCode.NoContent;
            }
            return response;
        }
    }
}
