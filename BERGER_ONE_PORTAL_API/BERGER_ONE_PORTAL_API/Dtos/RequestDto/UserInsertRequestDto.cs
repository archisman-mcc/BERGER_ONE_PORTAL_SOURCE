using BERGER_ONE_PORTAL_API.Repository.Utility;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class UserInsertRequestDto
    {
        [JsonProperty("userId")]
        public string? userId { get; set; }

        [JsonProperty("firstName")]
        public string? firstName { get; set; }

        [JsonProperty("lastName")]
        public string? lastName { get; set; }

        [JsonProperty("password")]
        public string? password { get; set; }

        [JsonProperty("employeeId")]
        public string? employeeId { get; set; }

        [JsonProperty("department")]
        public string? department { get; set; }

        [JsonProperty("designation")]
        public string? designation { get; set; }

        [JsonProperty("emailId")]
        public string? emailId { get; set; }

        [JsonProperty("mobileNo")]
        public string? mobileNo { get; set; }

        [JsonProperty("dateOfJoining")]
        public DateTime? dateOfJoining { get; set; }

        [JsonProperty("depot")]
        public string? depot { get; set; }

        [JsonProperty("active")]
        public string? Active { get; set; }

        [JsonProperty("createdUser")]
        public string? createdUser { get; set; }

        [JsonProperty("appWiseData")]
        public List<UserAppWiseData>? appWiseData { get; set; }

    }

    public class UserAppWiseData
    {
        public string? label { get; set; }
        public int? value { get; set; }
        public string? userGroup { get; set; }
        public string? selectedDepots { get; set; }
        public string? selectedTerritories { get; set; }
    }
}
