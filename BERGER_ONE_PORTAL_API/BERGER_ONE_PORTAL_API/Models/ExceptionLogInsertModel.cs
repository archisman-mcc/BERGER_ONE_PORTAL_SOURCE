using BERGER_ONE_PORTAL_API.CustomAttribute;

namespace BERGER_ONE_PORTAL_API.Models;

public class ExceptionLogInsertModel
{
    [CustomSqlParameterName("@log_refNo")] public string? LogRefNo { get; set; } = default;

    [CustomSqlParameterName("@response_content")] public string? ResponseContent { get; set; } = default;

    [CustomSqlParameterName("@request_curl")] public string? RequestCurl { get; set; } = default;

    [CustomSqlParameterName("@stack_trace")] public string? ExceptionStackTrace { get; set; } = default;
}