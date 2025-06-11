namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class GetBillingListRequestDto
    {
        public string? Region { get; set; }
        public string? DepotCode { get; set; }
        public string? TerrCode { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public string? SearchKey { get; set; }
    }
    public class GetBillingDetailsRequestDto
    {
        public Int64? OrderId { get; set; }
    }
    public class GetBillingTLVBalanceRequestDto
    {
        public string? depot_code { get; set; }
        public string? dealer_code { get; set; }
        public string? bill_to { get; set; }
    }
    public class InsertBillingSKURequestDto
    {
        public decimal? bill_to_code { get; set; }
        public Int64? project_id { get; set; }
        public List<BillingSKUInsertRequestDto> billing_sku { get; set; }
    }
    public class BillingSKUInsertRequestDto
    {
        public string? bpd_sku_id { get; set; }
        public decimal? bpd_stock { get; set; }
        public decimal? bpd_declared_rate { get; set; }
        public decimal? bpd_approved_rate { get; set; }
        public decimal? bpd_no_of_pack { get; set; }
        public decimal? bpd_total_amount { get; set; }
    }
}
