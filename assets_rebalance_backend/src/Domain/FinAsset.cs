using System;
using assets_rebalance_backend.src.Domain.Enums;

namespace assets_rebalance_backend.src.Domain;

public class FinAsset
{
    public required string Name { get; set; }
    public string? Tag { get; set; }
    public required int Score { get; set; } = 1;
    public required decimal CurrentAmount { get; set; }
    public required Guid AccountId { get; set; }
    public int? CurrentQuantity { get; set; }
    public required FinAssetCategory Category { get; set; }
    public FinAssetExternalVariableIncomeData? VariableIncomeData { get; set; }
    public FinAssetFixedIncomeData? FixedIncomeData { get; set; }
        
    public decimal ScorePercent => (decimal)Score / 100;
    public decimal RecommendedAmount(FinAssetsGroup parent_group, decimal total_amount) 
        =>  total_amount * parent_group.ScorePercent * ScorePercent; 

    public decimal AdjustAmount(FinAssetsGroup parent_group, decimal total_amount) 
        => RecommendedAmount(parent_group, total_amount) - CurrentAmount;
}
