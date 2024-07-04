namespace BERGER_ONE_PORTAL_API.Dtos
{
    public class RefreshTokenDto
    {
        public string Token { get; set; }
        public string Username { get; set; }
        public DateTime ExpiryDate { get; set; }
    }

}
