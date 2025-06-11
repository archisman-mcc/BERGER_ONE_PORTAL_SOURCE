namespace BERGER_ONE_PORTAL_API.Models
{
    public class RefreshTokenModel
    {
        public string? rt_user_id { get; set; }
        public string? rt_app_portal { get; set; } = "PORTAL";
        public string? rt_token { get; set; }
        public DateTime rt_expiry_date { get; set; }

    }
}
