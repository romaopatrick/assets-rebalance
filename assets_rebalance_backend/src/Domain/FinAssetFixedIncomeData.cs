using System;
using assets_rebalance_backend.src.Domain.Enums;

namespace assets_rebalance_backend.src.Domain;

public class FinAssetFixedIncomeData
{
    public required FixedIncomeIndexer Indexer { get; set; }
    public required decimal IndexerPercent { get; set; }
    public required DateTime ExpirationDate { get; set; }
    public required decimal ApplicationAmount { get; set; }
    public required decimal GrossValue { get; set; }
    public required decimal NetValue { get; set; }
    public decimal TaxesValue => GrossValue - NetValue;
    public decimal TaxesPercentage => TaxesValue * 100 / GrossValue;
    public decimal CurrentNetBalance => NetValue - ApplicationAmount;
    public decimal CurrentNetBalancePercent => CurrentNetBalance * 100 / ApplicationAmount; 
    public decimal CurrentGrossBalance => GrossValue - ApplicationAmount;
    public decimal CurrentGrossBalancePercent => CurrentGrossBalance * 100 / ApplicationAmount;
}
