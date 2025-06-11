namespace MSSQL_HELPER.Model;
public struct Constants
{
    internal const string RequestIsNull = "Request is null.";
    internal const string ConnectionStringIsNull = "Connection String is empty or null.";
    internal const string DataBaseNameIsNull = "Database name is empty or null.";
    internal const string ConnectionPropertiesIsNull = "Connection properties is empty or null.";
    internal const string CommandTextIsNull = "Command text is empty or null.";
    internal const string DBServerNameIsNull = "Database Server name is empty or null.";
    internal const string DBNameIsNull = "Database name is empty or null.";
    internal const string DBUserIdIsNull = "Database user id is empty or null.";
    internal const string DBPasswordIsNull = "Database password is empty or null.";
    internal const string CommandType = "Command type is empty or null.";
    internal const int SQLCommandTimeOut = 30;
    internal const int SQLRetryDelay = 3000;
    internal const int SQLRetryCount = 3;

    public struct Common
    {
        public static readonly string BergerEmailAPI = "https://bpilmobile.bergerindia.com/mccapis/email/v1/send";

        public const string BergerSMSAPI = "https://bpilmobile.bergerindia.com/smsapi/berger.asmx/SendSMS";


        public const string KnowlarityAuthorization = "43642e40-092a-480f-9648-3e8637d081e9";
        public const string KnowlarityApiKey = "lKIu4fqmTmax1lDA2Qmpv1AFYMOOdiLo53nQcXVD";
        public const string KnowlarityCallerId = "+918035385670";
        public const string KnowlarityKNumber = "+919513103822";
        public const string KnowlarityApiUrl = "https://kpi.knowlarity.com/Basic/v1/account/call/makecall";
        public const string? SmsProviderAirtel = "A";

        public static readonly string ACLWhatsappAPIUserId = "bergerwts";
        public static readonly string ACLWhatsappAPIPassword = "bergerwts9";
        public static readonly string ACLWhatsappAPIUrl = "https://push.aclwhatsapp.com/pull-platform-receiver/wa/messages";

        public const string AuthKeyBergerSms = "CHFDERTIOMNHGTAALOY";
        public const string NotificationAppname = "BPIL_CRM_NOTIFICATION_SENDER";
    }
}
