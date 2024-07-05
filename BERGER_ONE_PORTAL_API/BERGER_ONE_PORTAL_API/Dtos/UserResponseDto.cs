using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos
{
    public class UserResponseDto
    {
        public class DataTableResponse
        {
            [JsonProperty("meta")]
            public Meta? Meta { get; set; }
        }
        public class Meta
        {
            [JsonProperty("totalRowCount")]
            public long? TotalRowCount { get; set; }

        }
    }
}
