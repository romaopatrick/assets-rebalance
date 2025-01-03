using System;

namespace assets_rebalance_backend.Boundaries;

public class GetFinAssetPanelByIdInput
{
    public required Guid Id { get; set; }
    public bool RemoveDebitAdjusts { get; set; } = false;
}
