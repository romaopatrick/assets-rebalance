using assets_rebalance_backend.Domain.Enums;

namespace assets_rebalance_backend.Domain;

public class FinAsset : Entity
{
    
    public Guid PanelId { get; set; }
    public Guid GroupId { get; set; }
    public required string Name { get; set; }
    public string? Tag { get; set; }
    public required decimal Score { get; set; } = 1;
    public required decimal CurrentAmount { get; set; }
    public required Guid AccountId { get; set; }
    public decimal? CurrentQuantity { get; set; }
    public required FinAssetCategory Category { get; set; }
    public FinAssetExternalVariableIncomeData? VariableIncomeData { get; set; }
    public FinAssetFixedIncomeData? FixedIncomeData { get; set; }
    public FinAssetStatus Status { get; set; } = FinAssetStatus.Active;
    public decimal AdjustAmount(FinAssetsGroup parent_group, FinAssetsPanel panel)
        => RecommendedAmount(parent_group, panel) - CurrentAmount;

    public decimal BuyScorePercent(FinAssetsGroup group, FinAssetsPanel panel)
    {
        if (!IsBuy(group, panel)) return decimal.Zero;

        var childrenTotalBuyScore = group.ChildrenBuyScore(panel);
        return Score / (childrenTotalBuyScore > 0 ? childrenTotalBuyScore : 1);
    }

    public decimal BuyAdjustAmount(FinAssetsGroup group, FinAssetsPanel panel)
    {
        if (!IsBuy(group, panel))
            return decimal.Zero;


        return BuyScorePercent(group, panel) * group.BuyAdjustAmount(panel);
    }
    public decimal ScorePercent(FinAssetsGroup group) => Score / (group.ChildrenScore > 0 ? group.ChildrenScore : 1);
    public decimal RecommendedAmount(FinAssetsGroup parent_group, FinAssetsPanel panel)
        => parent_group.RecommendedAmount(panel) * ScorePercent(parent_group);
    public decimal BuyRecommendedAmount(FinAssetsGroup group, FinAssetsPanel panel) =>
        CurrentAmount + BuyAdjustAmount(group, panel) ;

    public bool IsBuy(FinAssetsGroup parent_group, FinAssetsPanel panel)
        => AdjustAmount(parent_group, panel) > 0;
}
