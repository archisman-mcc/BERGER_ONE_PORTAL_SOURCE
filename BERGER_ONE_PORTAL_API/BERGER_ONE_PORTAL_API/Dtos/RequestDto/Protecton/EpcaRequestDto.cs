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

    public class GetFactoryRequestDto
    {
        public string? sku_code { get; set; }
        public int? app_id { get; set; }

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
}
