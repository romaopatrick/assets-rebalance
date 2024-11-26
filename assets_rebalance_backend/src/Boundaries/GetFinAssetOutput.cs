using assets_rebalance_backend.src.Domain;
using assets_rebalance_backend.src.Domain.Enums;

namespace assets_rebalance_backend.src.Boundaries;

public class GetFinAssetOutput
{
    public required string Name { get; set; }
    public string? Tag { get; set; }
    public required decimal Score { get; set; } = 1;
    public required decimal CurrentAmount { get; set; }
    public required Guid AccountId { get; set; }
    public decimal? CurrentQuantity { get; set; }
    public required FinAssetCategory Category { get; set; }
    public FinAssetExternalVariableIncomeData? VariableIncomeData { get; set; }
    public FinAssetFixedIncomeData? FixedIncomeData { get; set; }
    public decimal ScorePercent { get; set; }
    public decimal RecommendedAmount { get; set; }
    public decimal AdjustAmount { get; set; }
    public static GetFinAssetOutput FromDomain(FinAsset finAsset, FinAssetsGroup parent, FinAssetsPanel panel) => new()
    {
        Name = finAsset.Name,
        Tag = finAsset.Tag,
        Score = finAsset.Score,
        CurrentAmount = finAsset.CurrentAmount,
        AccountId = finAsset.AccountId,
        CurrentQuantity = finAsset.CurrentQuantity,
        Category = finAsset.Category,
        VariableIncomeData = finAsset.VariableIncomeData,
        FixedIncomeData = finAsset.FixedIncomeData,
        ScorePercent = finAsset.ScorePercent,
        RecommendedAmount = finAsset.RecommendedAmount(parent, panel.TotalAmount),
        AdjustAmount = finAsset.AdjustAmount(parent, panel.TotalAmount)
    };
}
