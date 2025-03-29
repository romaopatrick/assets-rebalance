using System;
using System.Text.Json.Serialization;

namespace assets_rebalance_backend.Boundaries;

public class IndexerDataResponse
{
    public List<IndexerDataItem> Value { get; set; } = [];
}

public class IndexerDataItem
{
    [JsonPropertyName("SERCODIGO")]
    public string Code { get; set; } = string.Empty;

    [JsonPropertyName("VALVALOR")]
    public decimal Value { get; set; }

    [JsonPropertyName("VALDATA")]
    public DateTime Date { get; set; }
}