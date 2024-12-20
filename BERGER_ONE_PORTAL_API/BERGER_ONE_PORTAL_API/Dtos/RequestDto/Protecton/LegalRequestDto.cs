using BERGER_ONE_PORTAL_API.CustomAttribute;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class LegalRequestDto
    {
    }

    public class LegalOutStandingRequestDto
    {
        public string? SblCode { get; set; }
        public string? CommtYear { get; set; }
        public string? CommtMonth { get; set; }
        public string? DepotRegn { get; set; }
        public string? DepotCode { get; set; }
        public string? DealerCode { get; set; }
        public string? DealerName { get; set; }
        public string? DealerCatg { get; set; }
        public string? NoticeYn { get; set; }
        public string? NoticeYnHo { get; set; }
        public string? LegalStatus { get; set; }
        public decimal? FromValue { get; set; }
        public decimal? ToValue { get; set; }
        public string? UspUserId { get; set; }
        public string? Company { get; set; }
        public string? StatusCode { get; set; }
    }

    public class GetLegalOutStandingRequest
    {
        private string? _sblCode;
        private string? _commtYear { get; set; }
        private string? _commtMonth { get; set; }
        private string? _depotRegn { get; set; }
        private string? _depotCode { get; set; }
        private string? _dealerCode { get; set; }
        private string? _dealerName { get; set; }
        private string? _dealerCatg { get; set; }
        private string? _noticeYn { get; set; }
        private string? _noticeYnHo { get; set; }
        private string? _legalStatus { get; set; }
        private decimal? _fromValue { get; set; }
        private decimal? _toValue { get; set; }
        private string? _uspUserId { get; set; }
        private string? _company { get; set; }
        private string? _statusCode { get; set; }


        [CustomSqlParameterName("@sbl_code")]
        public string? SblCode 
        {
            get => _sblCode;
            set => _sblCode = value == "" ? null : value;
        }

        [CustomSqlParameterName("@commt_year")]
        public string? CommtYear
        {
            get => _commtYear;
            set => _commtYear = value == "" ? null : value;
        }

        [CustomSqlParameterName("@commt_month")]
        public string? CommtMonth
        {
            get => _commtMonth;
            set => _commtMonth = value == "" ? null : value;
        }

        [CustomSqlParameterName("@depot_regn")]
        public string? DepotRegn
        {
            get => _depotRegn;
            set => _depotRegn = value == "" ? null : value;
        }

        [CustomSqlParameterName("@depot_code")]
        public string? DepotCode
        {
            get => _depotCode;
            set => _depotCode = value == "" ? null : value;
        }

        [CustomSqlParameterName("@dealer_code")]
        public string? DealerCode
        {
            get => _dealerCode;
            set => _dealerCode = value == "" ? null : value;
        }

        [CustomSqlParameterName("@dealer_name")]
        public string? DealerName
        {
            get => _dealerName;
            set => _dealerName = value == "" ? null : value;
        }

        [CustomSqlParameterName("@dealer_catg")]
        public string? DealerCatg
        {
            get => _dealerCatg;
            set => _dealerCatg = value == "" ? null : value;
        }

        [CustomSqlParameterName("@notice_yn")]
        public string? NoticeYn
        {
            get => _noticeYn;
            set => _noticeYn = value == "" ? null : value;
        }

        [CustomSqlParameterName("@notice_yn_ho")]
        public string? NoticeYnHo
        {
            get => _noticeYnHo;
            set => _noticeYnHo = value == "" ? null : value;
        }

        [CustomSqlParameterName("@legal_status")]
        public string? LegalStatus
        {
            get => _legalStatus;
            set => _legalStatus = value == "" ? null : value;
        }

        [CustomSqlParameterName("@FromValue")]
        public decimal? FromValue
        {
            get => _fromValue;
            set => _fromValue = value == 0 ? null : value;
        }

        [CustomSqlParameterName("@ToValue")]
        public decimal? ToValue
        {
            get => _toValue;
            set => _toValue = value == 0 ? null : value;
        }

        [CustomSqlParameterName("@usp_user_id")]
        public string? UspUserId
        {
            get => _uspUserId;
            set => _uspUserId = value == "" ? null : value;
        }

        [CustomSqlParameterName("@company")]
        public string? Company
        {
            get => _company;
            set => _company = value == "" ? null : value;
        }

        [CustomSqlParameterName("@status_code")]
        public string? StatusCode
        {
            get => _statusCode;
            set => _statusCode = value == "" ? null : value;
        }
    }
}
