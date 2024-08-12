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
