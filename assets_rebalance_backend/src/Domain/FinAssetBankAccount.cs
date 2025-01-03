using System;

namespace assets_rebalance_backend.Domain;

public class FinAssetBankAccount : Entity
{
    public required FinAssetBank Bank { get; set; }
    public required string Name { get; set; }
    public IEnumerable<string> Tags { get; set;} = [];
}
