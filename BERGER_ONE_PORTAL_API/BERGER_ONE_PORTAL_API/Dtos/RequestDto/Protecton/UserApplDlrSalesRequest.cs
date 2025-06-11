namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class UserApplDlrSalesRequest
    {
        public Int32 app_id { get; set; }
        public string AsOnDate { get; set; }
        public string repType { get; set; }
        public string prd_grp { get; set; }
        public string report_grp_level { get; set; }
        public string regn { get; set; }
        public string depot { get; set; }
        public string terr { get; set; }
        public string dlr { get; set; }
        public string? selected_user { get; set; }
    }

    public class UserApplDlrSalesDtlsRequest
    {
        public Int32 app_id { get; set; }
        public string AsOnDate { get; set; }
        public string repType { get; set; }
        public string prd_grp { get; set; }
        public string report_grp_level { get; set; }
        public string regn { get; set; }
        public string depot { get; set; }
        public string terr { get; set; }
        public string dlr { get; set; }
    }
}
