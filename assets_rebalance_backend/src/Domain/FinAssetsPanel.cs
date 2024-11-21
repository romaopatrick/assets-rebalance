using System;

namespace assets_rebalance_backend.src.Domain;

public class FinAssetsPanel : Entity
{
    public IEnumerable<FinAssetsGroup> Children { get; set; } = [];
    public decimal InvestedAmount => Children.Sum(x => x.CurrentAmount);
    public decimal TotalAmount => InvestedAmount + AmountToInvest;
    public required decimal AmountToInvest { get; set; } = 0;
}
