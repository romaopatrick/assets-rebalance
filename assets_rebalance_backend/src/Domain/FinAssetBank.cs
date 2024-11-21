using System;

namespace assets_rebalance_backend.src.Domain;

public class FinAssetBank : Entity
{
    public required string Name { get; set; }
    public required string Routing { get; set; }
    public string? Ispb { get; set; }
    public string? IspbName { get; set; }
    public string? IconBase64 { get; set; }
}
