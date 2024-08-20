using System.ComponentModel.DataAnnotations;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class EpcaRequestDto
    {

    }

    public class pcaStatusRequestDto
    {
        [Required]
        public long? app_id { get; set; }
    }

    public class pcaDealersRequestDto
    {
        [Required]
        public string? depot_code { get; set; }
        public string? terr_code { get; set; }
        public string? sbl_code { get; set; }
    }

    public class pcaProjectRequestDto
    {
        [Required]
        public string? depot_code { get; set; }
        public string? terr_code { get; set; }
        public string? srch { get; set; }
    }

    public class GetSKUListRequestDto
    {
        public int app_id { get; set; }
        [Required]
        public string? PrefixText { get; set; }

    }

    public class GetBillToRequestDto
    {
        public string? depot_code { get; set; }
        public string? dealer_code { get; set; }
        public string? sbl_code { get; set; }

    }

    public class GetMinRateBySkuRequestDto
    {
        public string? sku_code { get; set; }
        public string? bill_to { get; set; }

    }

    public class GetPcaDetailsStatusRequestDto
    {
        public Decimal? billto_code { get; set; }
        public string? sku_code { get; set; }
        public DateTime? valid_from { get; set; }

    }

    public class GetPcaDetailsRequestDto
    {
        public Decimal? billto_code { get; set; }
        public string? aprv_status { get; set; }
        public string? main_status { get; set; }

    }

    public class PcaCancellationRequestDto
    {
        public int app_id { get; set; }
        public string? DepotCode { get; set; }
        public string? TerrCode { get; set; }
        public string? BilltoCode { get; set; }
        public string? DealerCode { get; set; }
        public string DealerName { get; set; } = "";
        public string? AprvStatus { get; set; }
        public string? MainStatus { get; set; }
        public string? frm_date { get; set; }
        public string? to_date { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }

    }

    public class CanclePcaRequestDto
    {
        public Decimal auto_id { get; set; }

    }

    public class GetFactoryRequestDto
    {
        public string? sku_code { get; set; }
        public int? app_id { get; set; }

    }

    public class DeletePCARequestDto
    {
        public Decimal? auto_id { get; set; }

    }


    public class GetePCAListRequestDto
    {
        public int app_id { get; set; }
        public string? DepotCode { get; set; }
        public string? TerritoryCode { get; set; }
        public string? BillToCode { get; set; }
        public string? AcctNo { get; set; }
        public string? DealerName { get; set; }
        public string? SblCode { get; set; }
        public string? ApprovedStatus { get; set; }
        public string? MainStatus { get; set; }
    }

    public class PcaInsertRequestDto
    {
        public decimal? auto_id { get; set; }
        public decimal? billto_code { get; set; }
        public string? sku_id { get; set; }
        public string? factory { get; set; }
        public decimal? rate { get; set; }
        public int? qty { get; set; }
        public DateTime? valid_from { get; set; }
        public DateTime? valid_till { get; set; }
        public string? status { get; set; }
        public string? remarks { get; set; }
        public string? app_name { get; set; }
        public string? user_id { get; set; }
        public decimal? mrp { get; set; }
        public long? projectid { get; set; }
    }
}
