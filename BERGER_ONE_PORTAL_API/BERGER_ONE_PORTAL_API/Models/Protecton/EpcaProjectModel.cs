using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models.Protecton
{
    public class EpcaProjectModel
    {
        [JsonProperty("ProjectName")]
        public string? ProjectName { get; set; }

        [JsonProperty("ProjectId")]
        public int? ProjectId { get; set; }
    }
}
