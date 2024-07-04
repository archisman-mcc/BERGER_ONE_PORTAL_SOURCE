namespace BERGER_ONE_PORTAL_API.Common.Utilty
{
    public static class Constant
    {
        public static class ResponseMsg
        {
            public const string Success = "Success";
            public const string Failed = "Failed";
            public const string Invalid = "Invalid";
            public const string InvalidFinYear = "Please seelct a valid financial year. Please try again.";
            public const string NoData = "No record(s) found.";
            public const string InsertSuccess = "Record(s) inserted successfully.";
            public const string UpdateSuccess = "Record(s) updated successfully.";
            public const string ApproveSuccess = "Record(s) approved successfully.";
            public const string RejectSuccess = "Record(s) rejected successfully.";
            public const string ApproveFailure = "Failed to approve record(s). Please try again.";
            public const string RejectFailure = "Failed to reject record(s). Please try again.";
            public const string UpdateFailure = "Failed to update record(s). Please try again.";
            public const string InsertFailure = "Failed to insert record(s). Please try again.";
            public const string LoginSuccessful = "Logged in successfully.";
            public const string LoginFailed = "Invalid User Id or Password.";
            public const string RequiredFields = "Please fill required fields.";
            public const string NoDataUpdate = "Please fill at least one cell.";
            public const string SessionExpired = "SessionExpired";
            public const string ExceptionOccured = "ExceptionOccured";
            public const string ExceptionMsg = "An error occurred. Contact administrator";
            public const string AllNotificationSent = "Notification sent to all users successfully.";
            public const string PartialNotificationSent = "Notification sent to only some users.";
            public const string NoNotificationSent = "Failed to send any notification.";
            public const string NoUserFound = "No users found to send notification.";
            public const string NoTemplateFound = "No template found to send notification.";
            public const string RequestParametersInvalid = "Invalid request paramters.";
            public const string InvalidToken = "Invalid Token.";
            public const string UnAuthorized = "User Authentication failed.";
            public const string UnAuthorizedAPI = "API Authentication failed.";
            public const string CollectPaymentRefreshOrderFailed = "Order has been marked as paid. But failed to refresh the order.";
            public const string CollectPaymentTimeStampUpdateFailed = "Failed to mark the order as Paid.";
            public const string CollectPaymentSuccess = "Order has marked as paid successfully.";
            public const string InvalidOrderId = "Invalid Order Id.";
            public const string InvalidUserId = "Invalid User Id.";
            public const string InvalidOrderAmount = "Invalid Order Amount.";
            public const string InvalidPaymentRefNo = "Invalid Reference No.";
            public const string InvalidPaymentMode = "Invalid Payment Mode.";
            public const string InvalidDeliveryPersonMobile = "Invalid Mobile no of Delivery Person.";
            public const string InvalidOrderItems = "Invalid order items.";
            public const string InvalidOrderItemsDetails = "One or more order item or quantity is invalid.";
            public const string InvalidSellerId = "Invalid Seller Id.";
            public const string InvalidOTP = "You have entered an invalid OTP.";
            public const string ExpiredOTP = "Your OTP has expired.";
            public const string InvalidInvoiceNo = "Invalid Invoice No.";
            public const string InvalidInvoiceDate = "Invalid Invoice Date.";
            public const string InvalidInvoiceImage = "Invalid Invoice Image.";
            public const string OrderAlreadyExists = "Order Id already exists.";
            public const string PreviousStepNotCompleted = "Failed to prcoess request. You have not completed the previous step.";
            public const string GenerateInvoiceSuccess = "Invoice generated successfully.";
            public const string UploadInvoiceSuccess = "Invoice uploaded successfully.";
            public const string GenerateInvoiceFailed = "Failed to generate invoice.";
            public const string UploadInvoiceFailed = "Failed to upload invoice.";
            public const string GenerateAndUploadInvoiceFailed = "Failed to generate & upload invoice.";
            public const string GenerateAndUploadInvoiceRefreshFailed = "Invoice generated & uploaded successfully. But failed to refresh the order.";
            public const string GenerateAndUploadInvoiceSuccess = "Invoice generated & uploaded successfully.";
            public const string GenerateOTPSuccess = "OTP generated successfully.";
            public const string GenerateOTPFailed = "Failed to generate OTP.";
            public const string GenerateOTPSendFailed = "Failed to send OTP.";
            public const string GenerateOTPSendSuccess = "OTP sent successfully";
            public const string ConfirmedDeliverySuccess = "Order has been delivered successfully.";
            public const string ConfirmedDeliveryFailed = "Failed to deliver order.";
            public const string ConfirmedDeliveryFailedRefresh = "Order has been delivered successfully. But failed to refresh the order.";
            public const string AcceptOrderSuccess = "Order accepted successfully.";
            public const string AcceptOrderFailed = "Failed to accept order.";
            public const string AcceptOrderFailedRefresh = "Order accepted successfully. But failed to refresh the order list.";
            public const string RejectOrderSuccess = "Order rejected successfully.";
            public const string RejectOrderFailed = "Failed to reject order.";
            public const string RejectOrderFailedRefresh = "Order rejected successfully. But failed to refresh the order list.";
            public const string PartialFulfilmentRefreshOrderFailed = "Order prepared successfully. But failed to refresh the order.";
            public const string PartialFulfilmentTimeStampUpdateFailed = "Failed to prepare order.";
            public const string PartialFulfilmentSuccess = "Order prepared successfully.";
            public const string InvalidRequest = "Invalid Request.";
            public const string InvalidMobileNo = "Invalid Mobile No.";
            public const string InvalidBaseColor = "Invalid Base Color.";
            public const string InvalidShade = "Invalid Shade Code.";
            public const string InvalidLanguage = "Invalid Language.";
            public const string InvalidShadeCode = "Invalid Shade Code.";
            public const string InvalidBeautifulWorksImages = "Invalid Images.";
            public const string InvalidSurfaceType = "Invalid Surface Type.";
            public const string InvalidPreviewId = "Invalid Preview Id.";
            public const string InvalidQuizDate = "Invalid Quiz Date.";
            public const string InvalidQuizScores = "Invalid Quiz Score Data.";
            public const string InvalidSchemeId = "Invalid Scheme Id.";
            public const string InvalidMonth = "Invalid Month. Month should be two digit no.(e.g. '01','11')";
            public const string InvalidYear = "Invalid Year. Year should be four digit no.";
            public const string InvalidName = "Invalid Name.";
            public const string InvalidLocality = "Invalid Locality.";
            public const string InvalidTown = "Invalid Town.";
            public const string InvalidPinCode = "Invalid Pincode.";
            public const string InvalidProductCategory = "Invalid Product Category.";
            public const string InvalidProductClass = "Invalid Product Class.";
            public const string InvalidProductId = "Invalid Product Id.";
            public const string InvalidDateFormat = "Invalid Date Format. Valid Date format : dd/MM/yyyy";
            public const string InvalidFromDateFormat = "Invalid From Date Format. Valid Date format : dd/MM/yyyy";
            public const string InvalidToDateFormat = "Invalid To Date Format. Valid Date format : dd/MM/yyyy";
            public const string InvalidUserResponse = "Invalid User Response.";
            public const string InvalidDocuments = "Invalid Documents.";

            public const string InvalidPassword = "Invalid Password.";
            public const string InvalidLogin = "Invalid UserId or Password.";
            public const string InvalidStatus = "Invalid Status";
            public const string InvalidRejectionReason = "Invalid Rejection Reason.";
            public const string InvalidImages = "Invalid Images.";


            public const string InvalidFormId = "Invalid Form Id.";
            public const string InvalidFormName = "Invalid Form Name.";
            public const string InvalidAdId = "Invalid Ad Id.";



        }

        public static class DataBases
        {
            public const string OneAppMSSQLDB = "BD_APP_DB";
        }
        public struct Common
        {
            public const int JWTTokenExpiryMins = 1440; //60
            public const int JWTTokenExpiryMinsPortal = 5; //60
            public const int SQLCommandTimeOut = 0; //60
            public const string APIPrefix = "api/v1.0/";
            public const string PortalAPIPrefix = "api/v1.0/";
            public const string BergerSMSAPI = "https://bpilmobile.bergerindia.com/smsapi/berger.asmx/SendSMS";

            public const string ActiveStatus = "Y";
            public const string InactiveStatus = "N";
            public const string KnowlarityAuthorization = "43642e40-092a-480f-9648-3e8637d081e9";
            public const string KnowlarityApiKey = "lKIu4fqmTmax1lDA2Qmpv1AFYMOOdiLo53nQcXVD";
            public const string KnowlarityCallerId = "+918035385670";
            public const string KnowlarityKNumber = "+919513103822";
            public const string KnowlarityApiUrl = "https://kpi.knowlarity.com/Basic/v1/account/call/makecall";
            public const string? SmsProviderAirtel = "A";

            public static readonly string ACLWhatsappAPIUserId = "bergerwts";
            public static readonly string ACLWhatsappAPIPassword = "bergerwts9";
            public static readonly string ACLWhatsappAPIUrl = "https://push.aclwhatsapp.com/pull-platform-receiver/wa/messages";

            public static readonly string BergerEmailAPI = "https://bpilmobile.bergerindia.com/mccapis/email/v1/send";
            public const string AuthKeyBergerSms = "CHFDERTIOMNHGTAALOY";
            public const string NotificationAppname = "ONE_APP";
            public const string SmsSID = "BERSYS";


        }
        public struct NotificationType
        {
            public const string Email = "Email";
            public const string SMS = "SMS";
            public const string Whatsapp = "Whatsapp";
        }
        public struct SmsTemplate
        {
            public const string LoginSmsTemplate = "1007253324442931798";
        }

        public struct ProjectName
        {
            public const string PROTECTON = "PROTECTON";
            public const string WCAPP = "WCAPP";
        }
    }
}
