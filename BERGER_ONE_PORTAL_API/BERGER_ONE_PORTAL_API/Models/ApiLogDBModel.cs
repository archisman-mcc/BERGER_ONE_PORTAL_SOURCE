namespace BERGER_ONE_API.Models
{
    public class ApiLogDBModel
    {
        public string? al_url {get;set;}
        public string? al_controller { get; set; }
        public string? al_action { get; set; }
        public string? al_params { get; set; }
        public string? al_req_time { get; set; }
        public int? al_time_taken { get; set; }
        public string? al_user_id { get; set; }
    }
}
