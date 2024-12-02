using assets_rebalance_backend.src.Domain.Enums;
using FluentResults;

namespace assets_rebalance_backend.src.Domain;

public class FinAssetsGroup
{
    public required string Name { get; set; }
    public required decimal Score { get; set; }
    public IEnumerable<FinAsset> Children { get; set; } = [];
    public decimal CurrentAmount => Children.Sum(x => x.CurrentAmount);
    public decimal ScorePercent => Score / 100;
    public required FinAssetCategory Category { get; set; }
    public decimal RecommendedAmount(decimal total_amount) => ScorePercent * total_amount;
    public decimal AdjustAmount(decimal total_amount)
        => RecommendedAmount(total_amount) - CurrentAmount;

        public decimal TagCurrentAmount(string tag) => 
            Children.Where(x => x.Tag == tag).Sum(x => x.CurrentAmount);

    public Result Validate()
    {
        var taggedScore = Children
            .GroupBy(x => new { x.Tag, x.Score })
            .Sum(x => x.First().Score);

        if (taggedScore != 100 && Category.UseTags())
            return Result.Fail($"tagged group {Name} children score must sum 100 but sums {taggedScore}");


        var score = Children.Sum(x => x.Score);
        if (score != 100 && !Category.UseTags())
            return Result.Fail($"group {Name} children  score must sum 100 but sums {score}");

        return Result.Ok();
    }
}
