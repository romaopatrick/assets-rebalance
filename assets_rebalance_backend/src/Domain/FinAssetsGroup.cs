using System;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace assets_rebalance_backend.src.Domain;

public class FinAssetsGroup
{
    public required string Name { get; set; }
    public required int Score { get; set; }
    public IEnumerable<FinAsset> Children { get; set; } = [];
    public decimal ScorePercent => Score / 100;
    public decimal CurrentAmount => Children.Sum(x => x.CurrentAmount);
}
