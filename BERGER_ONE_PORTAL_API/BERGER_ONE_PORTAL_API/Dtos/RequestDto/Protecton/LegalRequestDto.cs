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
}
