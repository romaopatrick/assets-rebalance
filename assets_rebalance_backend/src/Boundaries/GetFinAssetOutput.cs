using assets_rebalance_backend.Domain;
using assets_rebalance_backend.Domain.Enums;

namespace assets_rebalance_backend.Boundaries;

public class GetFinAssetOutput
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Tag { get; set; }
    public required decimal Score { get; set; } = 1;
    public required decimal CurrentAmount { get; set; }
    public required Guid AccountId { get; set; }
    public decimal? CurrentQuantity { get; set; }
    public required FinAssetCategory Category { get; set; }
    public required FinAssetStatus Status { get; set; }
    public FinAssetExternalVariableIncomeData? VariableIncomeData { get; set; }
    public FinAssetFixedIncomeData? FixedIncomeData { get; set; }
    public decimal ScorePercent { get; set; }
    public decimal RecommendedAmount { get; set; }
    public decimal AdjustAmount { get; set; }
    public decimal BuyAdjustAmount { get; set; } = 0;
    public decimal BuyRecommendedAmount { get; set; } = 0;
    public decimal BuyScorePercent { get; set; } = 0;
    public static GetFinAssetOutput FromDomain(FinAsset finAsset, FinAssetsGroup parent, FinAssetsPanel panel) => new()
    {
        Id = finAsset.Id,
        Name = finAsset.Name,
        Tag = finAsset.Tag,
        Score = finAsset.Score,
        CurrentAmount = finAsset.CurrentAmount,
        AccountId = finAsset.AccountId,
        CurrentQuantity = finAsset.CurrentQuantity,
        Category = finAsset.Category,
        Status = finAsset.Status,
        VariableIncomeData = finAsset.VariableIncomeData,
        FixedIncomeData = finAsset.FixedIncomeData,
        ScorePercent = finAsset.ScorePercent(parent),
        RecommendedAmount = finAsset.RecommendedAmount(parent, panel),
        AdjustAmount = finAsset.AdjustAmount(parent, panel),
        BuyAdjustAmount = finAsset.BuyAdjustAmount(parent, panel),
        BuyRecommendedAmount = finAsset.BuyRecommendedAmount(parent, panel),
        BuyScorePercent = finAsset.BuyScorePercent(parent, panel),
    };
}
