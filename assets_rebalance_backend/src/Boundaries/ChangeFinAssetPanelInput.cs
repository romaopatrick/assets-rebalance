using System;
using assets_rebalance_backend.src.Domain;

namespace assets_rebalance_backend.src.Boundaries;

public class ChangeFinAssetsPanelInput
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required decimal AmountToInvest { get; set; } = 0;
    public IEnumerable<FinAssetsGroup> Children { get; set; } = [];
    public required string Name { get; set; }


    public FinAssetsPanel Domain()
       => new()
       {
           AmountToInvest = AmountToInvest,
           Children = Children,
           Id = Id,
           Name = Name,
       };
}
