using System;
using assets_rebalance_backend.Domain;

namespace assets_rebalance_backend.Boundaries;

public class ChangeFinAssetBankInput
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public required string Routing { get; set; }
    public string? Ispb { get; set; }
    public string? IspbName { get; set; }
    public string? IconBase64 { get; set; }

    public FinAssetBank Domain() => new()
    {
        Id = Id,
        Name = Name,
        Routing = Routing,
        Ispb = Ispb,
        IspbName = IspbName,
        IconBase64 = IconBase64
    };
}
