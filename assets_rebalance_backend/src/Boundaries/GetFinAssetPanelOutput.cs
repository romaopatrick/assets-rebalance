using System;
using assets_rebalance_backend.Domain;

namespace assets_rebalance_backend.Boundaries;

public class GetFinAssetPanelOutput
{
    public Guid Id { get; set; }
    public IEnumerable<GetFinAssetsGroupOutput> Children { get; set; } = [];
    public required string Name { get; set; }
    public required decimal AmountToInvest { get; set; } = 0;
    public decimal InvestedAmount { get; set; } = 0;
    public decimal TotalAmount { get; set; } = 0;
    public decimal TotalScore { get; set; } = 0;

    public static GetFinAssetPanelOutput FromDomain(FinAssetsPanel panel) => new()
    {
        Name = panel.Name,
        Id = panel.Id,
        AmountToInvest = panel.AmountToInvest,
        InvestedAmount = panel.InvestedAmount,
        TotalAmount = panel.TotalAmount,
        TotalScore = panel.TotalScore,
        Children = panel.Children.Select(x => GetFinAssetsGroupOutput.FromDomain(x, panel))
    };
}
