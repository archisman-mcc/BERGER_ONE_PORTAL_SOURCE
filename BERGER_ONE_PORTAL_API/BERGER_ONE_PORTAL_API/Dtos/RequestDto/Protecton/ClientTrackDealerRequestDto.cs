namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class ClientTrackDealerRequestDto
    {
        public string dealer { get; set; }
        public Int64 app_id { get; set; }
        public string regn { get; set; }
        public string depot { get; set; }
        public string terr { get; set; }
        public string user_group { get; set; }
    }

    public class ClientTrackDetailRequestDto
    {
        public string asondate { get; set; }
        public string repType { get; set; }
        public string client { get; set; }
    }

    public class ClientTrackTigerRequestDto
    {
        public string asondate { get; set; }
        public string repType { get; set; }
        public string client { get; set; }
    }

    public class ClientTrackOtherDetailRequestDto
    {
        public string asondate { get; set; }
        public string repType { get; set; }
        public string client { get; set; }

    }
}
