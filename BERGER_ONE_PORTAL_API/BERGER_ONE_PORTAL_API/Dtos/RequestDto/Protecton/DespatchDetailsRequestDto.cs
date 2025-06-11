namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class DespatchDetailsRequestDto
    {
        public string? region { get; set; }
        public string? depot_code { get; set; }
        public string? terr_code { get; set; }
        public Int32 days { get; set; }
        public string? rep_type { get; set; }
        public string? pri_sec { get; set; }
        public Int64? trx_id { get; set; }
    }
}
