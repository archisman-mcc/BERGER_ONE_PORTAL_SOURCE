
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models
{
    public class UserProfileModel
    {
        [JsonProperty("usp_user_id")]
        public string? UspUserId { get; set; }

        [JsonProperty("usp_first_name")]
        public string? UspFirstName { get; set; }

        [JsonProperty("usp_last_name")]
        public string? UspLastName { get; set; }

        [JsonProperty("usp_group_code")]
        public string? UspGroupCode { get; set; }

        [JsonProperty("usp_group_Name")]
        public string? UspGroupName { get; set; }

        [JsonProperty("usp_pswd")]
        public string? UspPswd { get; set; }

        [JsonProperty("usp_dept")]
        public string? UspDept { get; set; }

        [JsonProperty("usp_mailid")]
        public string? UspMailid { get; set; }

        [JsonProperty("usp_mobile")]
        public string? UspMobile { get; set; }

        [JsonProperty("usp_desig")]
        public string? UspDesig { get; set; }

        [JsonProperty("usp_doj")]
        public string? UspDoj { get; set; }

        [JsonProperty("usp_depot")]
        public string? UspDepot { get; set; }

        [JsonProperty("usp_employee_id")]
        public string? UspEmployeeId { get; set; }

        [JsonProperty("usp_reportee_user")]
        public string? UspReporteeUser { get; set; }

        [JsonProperty("created_user")]
        public string? created_user { get; set; }

        [JsonProperty("active")]
        public string? Active { get; set; }

        [JsonProperty("depot")]
        public List<DepotModels>? Depot { get; set; }
    }

    public class DepotModels
    {
        [JsonProperty("depot_code")]
        public string? DepotCode { get; set; }

    }

}
