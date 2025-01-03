using System;
using assets_rebalance_backend.Domain;
using assets_rebalance_backend.Domain.Enums;

namespace assets_rebalance_backend.Boundaries;

public class GetFinAssetsGroupOutput
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required decimal Score { get; set; }
    public IEnumerable<GetFinAssetOutput> Children { get; set; } = [];
    public decimal CurrentAmount { get; set; } = 0;
    public decimal ScorePercent { get; set; } = 0;
    public required FinAssetCategory Category { get; set; }
    public decimal RecommendedAmount { get; set; } = 0;
    public decimal AdjustAmount { get; set; } = 0;
    public decimal BuyAdjustAmount { get; set; } = 0;
    public decimal BuyRecommendedAmount { get; set; } = 0;
    public decimal BuyScorePercent { get; set; } = 0;
    public static GetFinAssetsGroupOutput FromDomain(FinAssetsGroup group, FinAssetsPanel panel) => new()
    {
        Id = group.Id,
        Name = group.Name,
        Score = group.Score,
        Category = group.Category,
        Children = group.Children.Select(x => GetFinAssetOutput.FromDomain(x, group, panel)),
        ScorePercent = group.ScorePercent(panel),
        CurrentAmount = group.CurrentAmount,
        RecommendedAmount = group.RecommendedAmount(panel),
        AdjustAmount = group.AdjustAmount(panel),
        BuyAdjustAmount = group.BuyAdjustAmount(panel),
        BuyRecommendedAmount = group.BuyRecommendedAmount(panel),
        BuyScorePercent = group.BuyScorePercent(panel),

    };
}
