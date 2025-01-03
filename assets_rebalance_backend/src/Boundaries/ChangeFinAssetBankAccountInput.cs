using System;
using assets_rebalance_backend.Domain;

namespace assets_rebalance_backend.Boundaries;

public class ChangeFinAssetBankAccountInput
{
    public Guid? Id { get; set; }
    public required Guid BankId { get; set; }
    public required string Name { get; set; }
    public IEnumerable<string> Tags { get; set; } = [];

    public FinAssetBankAccount Domain(FinAssetBank bank)
       => new()
       {
           Id = Id ?? Guid.NewGuid(),
           Bank = bank,
           Name = Name,
           Tags = Tags,
       };
}
