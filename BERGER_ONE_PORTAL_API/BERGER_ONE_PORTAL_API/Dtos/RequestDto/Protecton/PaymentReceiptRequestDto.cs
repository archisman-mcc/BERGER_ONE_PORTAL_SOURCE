namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto.Protecton
{
    public class PaymentReceiptRequestDto
    {
        public Int64 app_id { get; set; }
        public string user_group { get; set; }
        public string regn { get; set; }
        public string depot { get; set; }
        public string terr { get; set; }
        public int days { get; set; }
    }
}
