using System.ComponentModel.DataAnnotations;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class GetOSRequestDtlsDto
    {
        [Required]
        public Int32 app_id { get; set; }
        [Required]
        public string report_grp_level { get; set; }
        public string regn { get; set; }
        public string terr { get; set; }
        public string cat { get; set; }
    }

    public class GetOSSingleSmryRequestDto
    {
        public Int32 app_id { get; set; }
        public string report_grp_level { get; set; }
        public string regn { get; set; }
        public string terr { get; set; }
        public string cat { get; set; }
        public string? slab { get; set; }
    }

    public class GetTRXSmryRequestDto
    {
        public Int32 app_id { get; set; }
        public string dlrcode { get; set; }
        public string regn { get; set; }
        public string terr { get; set; }
        public string cat { get; set; }
        public string? slab { get; set; }
    }

    public class ODbyDateListDto
    {
        public string? cat { get; set; }
        public int day { get; set; }
        public string? region { get; set; }
        public string? terr_code { get; set; }
        public string? depot_code { get; set; }
    }
}
