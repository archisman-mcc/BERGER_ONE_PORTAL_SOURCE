namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class StockProductRequestDto
    {
        public string prd_desc { get; set; }
    }

    public class StockShadeRequestDto
    {
        public string? prd_code { get; set; }
        public string? shd_desc { get; set; }
    }
    public class StockSkuListRequestDto
    {
        public string app_id { get; set; }
        public string? regn { get; set; }
        public string? depot { get; set; }
        public string? prd_code { get; set; }
        public string? shd_code { get; set; }
    }
    public class ActionRcListDto
    {
        public string? cat { get; set; }
        public int? days { get; set; }
        public string? region { get; set; }
        public string? terr_code { get; set; }
        public string? depot_code { get; set; }
    }
    public class ActionDefaulterListDto
    {
        public string? cat { get; set; }
        public int top { get; set; }
        public string? region { get; set; }
        public string? terr_code { get; set; }
        public string? depot_code { get; set; }
        public int slab { get; set; }
    }
    public class StockReqListRequestDto
    {
        public string app_id { get; set; }
        public string? regn { get; set; }
        public string? depot { get; set; }
        public string? prd_code { get; set; }
        public string? sku_code { get; set; }
    }
}
