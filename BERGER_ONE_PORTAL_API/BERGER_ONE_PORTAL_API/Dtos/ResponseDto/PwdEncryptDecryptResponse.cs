using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class PwdEncryptDecryptResponse
    {
        [JsonProperty("data")]
        public PwdEncryptDecryptModel? Data { get; set; }
    }
}
