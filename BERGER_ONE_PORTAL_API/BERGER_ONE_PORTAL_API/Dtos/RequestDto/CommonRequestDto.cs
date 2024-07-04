using System.ComponentModel.DataAnnotations;

namespace BERGER_ONE_PORTAL_API.Dtos.RequestDto
{
    public class ReminderRequestDto
    {
        public string? user_id { get; set; }
    }
    public class PromotionalMsgRequestDto
    {
        [Required]
        public long? app_id { get; set; }
    }
    public class PromotionalMsgRequestModel
    {
        public string? user_id { get; set; }
        public long? app_id { get; set; }
    }
    public class UpdatePromotionalMsgRequestDto
    {
        [Required]
        public long? app_id { get; set; }
        [Required]
        public long? msg_id { get; set; }
    }
    public class UpdatePromotionalMsgRequestModel
    {
        public string? user_id { get; set; }
        public long? app_id { get; set; }
        public long? msg_id { get; set; }
    }
    public class GetRegionRequestDto
    {
        [Required]
        public string? user_group { get; set; }
        [Required]
        public long? app_id { get; set; }
    }
    public class RegionRequestModel
    {
        public string? user_id { get; set; }
        public string? user_group { get; set; }
        public long? app_id { get; set; }
    }
    public class GetApplicableDepotRequestDto
    {
        public string? depot_code { get; set; }
        [Required]
        public long? app_id { get; set; }
    }
    public class GetApplicableDepoModel
    {
        public string? user_id { get; set; }
        public string? depot_code { get; set; }
        public long? app_id { get; set; }
    }
    public class GetUserApplicableDealerReuqestDto
    {
        [Required]
        public Int64? app_id { get;  set; }
        public string? depot_regn { get; set; }
        public string? state_regn { get; set; }
        public string? depot_code { get; set; }
        public string? terr_code { get; set; }
    }
    public class GetUserApplicableDealerModel
    {
        public string? user_id { get; set; }
        public Int64? app_id { get; set; }
        public string? depot_regn { get; set; }
        public string? state_regn { get; set; }
        public string? depot_code { get; set; }
        public string? terr_code { get; set; }
    }

    public class GenericTblType
    {
        public string text_col { get; set; }
    }
}
