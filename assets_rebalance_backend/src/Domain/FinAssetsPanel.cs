using FluentResults;
using MongoDB.Bson.Serialization.Attributes;

namespace assets_rebalance_backend.Domain;

public class FinAssetsPanel : Entity
{
    [BsonIgnore]
    public IEnumerable<FinAssetsGroup> Children { get; set; } = [];
    public required string Name { get; set; }
    public required decimal AmountToInvest { get; set; } = 0;
    public decimal InvestedAmount => Children.Sum(x => x.CurrentAmount);
    public decimal TotalAmount => AmountToInvest + InvestedAmount;
    public decimal TotalScore => Children.Sum(x => x.Score);
    public decimal TotalBuyScore => Children.Where(x => x.IsBuy(this)).Sum(x => x.Score);
    public Result Validate()
    {
        var result = Result.Ok();
        var childrenSum = Children.Sum(x => x.Score);
        if (childrenSum != 100)
            result.WithError($"panel children must sum 100 but sums {childrenSum}");

        foreach (var child in Children)
        {
            var child_validation = child.Validate();
            if (child_validation.IsFailed)
                result.WithErrors(child_validation.Errors);
        }

        return result;
    }

    public IEnumerable<Guid> AllAccountIds()
        => Children.
                SelectMany(fin_asset_group
                    => fin_asset_group
                        .Children
                        .Select(fin_asset => fin_asset.AccountId));
}
