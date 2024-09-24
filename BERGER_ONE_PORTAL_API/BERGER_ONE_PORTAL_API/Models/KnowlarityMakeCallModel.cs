using Newtonsoft.Json;

namespace BERGER_ONE_PORTAL_API.Models;

public class KnowlarityMakeCallModel
{
    [JsonProperty("k_number")]
    public string? KNumber { get; set; }

    [JsonProperty("customer_number")]
    public string? CustomerNumber { get; set; }

    [JsonProperty("agent_number")]
    public string? AgentNumber { get; set; }

    [JsonProperty("caller_id")]
    public string? CallerId { get; set; }
}