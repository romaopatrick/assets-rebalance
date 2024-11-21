using System;
using assets_rebalance_backend.src.Domain;

namespace assets_rebalance_backend.src.Boundaries;

public class ChangeFinAssetPanelInput
{
    public Guid? PanelId { get; set; } = Guid.NewGuid();
    public required decimal AmountToInvest { get; set; } = 0;
    public IEnumerable<FinAssetsGroup> FinAssetsGroups{ get; set; } = [];
}
