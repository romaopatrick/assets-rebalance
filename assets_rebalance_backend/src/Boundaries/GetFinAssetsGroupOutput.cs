using System;
using assets_rebalance_backend.src.Domain;
using assets_rebalance_backend.src.Domain.Enums;

namespace assets_rebalance_backend.src.Boundaries;

public class GetFinAssetsGroupOutput
{
    public required string Name { get; set; }
    public required decimal Score { get; set; }
    public IEnumerable<GetFinAssetOutput> Children { get; set; } = [];
    public decimal CurrentAmount { get; set; } = 0;
    public decimal ScorePercent { get; set; } = 0;
    public required FinAssetCategory Category { get; set; }
    public decimal RecommendedAmount { get; set; } = 0;
    public decimal AdjustAmount { get; set; } = 0;
    public static GetFinAssetsGroupOutput FromDomain(FinAssetsGroup group, FinAssetsPanel panel) => new()
    {
        Name = group.Name,
        Score = group.Score,
        Category = group.Category,
        Children = group.Children.Select(x => GetFinAssetOutput.FromDomain(x, group, panel)),
        ScorePercent = group.ScorePercent,
        CurrentAmount = group.CurrentAmount,
        RecommendedAmount = group.RecommendedAmount(panel.TotalAmount),
        AdjustAmount = group.AdjustAmount(panel.TotalAmount),
    };
}
