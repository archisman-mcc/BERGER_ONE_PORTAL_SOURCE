using BERGER_ONE_PORTAL_API.Models;
using Newtonsoft.Json;
using static BERGER_ONE_PORTAL_API.Dtos.UserResponseDto;

namespace BERGER_ONE_PORTAL_API.Dtos.ResponseDto
{
    public class FormMenuResponse : DataTableResponse
    {
        [JsonProperty("data")]
        public List<FormMenuModel>? Data { get; set; }
    }

    public class FormMenuSaveResponse
    {
        [JsonProperty("response_message")]
        public string? ResponseMessage { get; set; }
    }
}