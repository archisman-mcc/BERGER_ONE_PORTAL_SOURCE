using BERGER_ONE_PORTAL_API.CustomAttribute;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class UserAppRequestDto
    {
        [Required]
        [JsonProperty("user_id")]
        public string? user_id { get; set; }
        [JsonProperty("url")]
        public string? Url { get; set; }
    }
    public class UserApplicableMenuReqDto
    {
        [Required]
        public int? app_id { get; set; }
        [Required]
        public string? user_group { get; set; }
    }
    public class UserApplicableMenuReqModel
    {
        [Required]
        public string? user_id { get; set; }
        [Required]
        public string? user_group { get; set; }
        [Required]
        public int? app_id { get; set; }
    }


    public class Filter
    {
        [JsonProperty("id")]
        public string? Id { get; set; }

        [JsonProperty("value")]
        public List<string>? Value { get; set; }

        [JsonProperty("operator")]
        public string? Operator { get; set; }

        [JsonProperty("dataType")]
        public string? DataType { get; set; }
    }

    public class Sorting
    {
        [JsonProperty("id")]
        public string? Id { get; set; }

        [JsonProperty("desc")]
        public bool? IsDescending { get; set; }
    }
    public class DataTableRequest
    {
        [JsonProperty("start"), CustomSqlParameterName("@start")]
        public int? Start { get; set; }

        [JsonProperty("size"), CustomSqlParameterName("@length")]
        public int? Size { get; set; }

        [JsonProperty("filters"), CustomSqlParameterIgnore]
        public List<Filter>? Filters { get; set; }

        [JsonIgnore, CustomSqlParameterName("@filterJSON")]
        public string? FilterSerializeValue => JsonConvert.SerializeObject(Filters ?? new());

        [JsonProperty("globalFilter"), CustomSqlParameterName("@keyword")]
        public string? GlobalFilter { get; set; }

        [JsonProperty("sorting"), CustomSqlParameterIgnore]
        public List<Sorting>? Sorting { get; set; }

        [JsonIgnore, CustomSqlParameterName("@orderJSON")]
        public string? OrderSerializeValue => JsonConvert.SerializeObject(Sorting ?? new());
    }


    public class UserListDto : DataTableRequest
    {
        [JsonProperty("view_type")]
        public string? ViewType { get; set; }

        [JsonProperty("group_by")]
        public string? GroupBy { get; set; }

        [JsonProperty("view_by")]
        public string? ViewBy { get; set; }

    }
}
