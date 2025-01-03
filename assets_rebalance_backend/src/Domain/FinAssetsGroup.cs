using assets_rebalance_backend.Domain.Enums;
using FluentResults;
using MongoDB.Bson.Serialization.Attributes;

namespace assets_rebalance_backend.Domain;

public class FinAssetsGroup : Entity
{
    public Guid PanelId { get; set; }
    public required string Name { get; set; }
    public required decimal Score { get; set; }

    [BsonIgnore]
    public IEnumerable<FinAsset> Children { get; set; } = [];
    public decimal CurrentAmount => Children.Sum(x => x.CurrentAmount);
    public required FinAssetCategory Category { get; set; }
    public decimal ChildrenScore => Children.Sum(x => x.Score);
    public decimal ChildrenBuyScore(FinAssetsPanel panel) => Children.Where(x => x.IsBuy(this, panel)).Sum(x => x.Score);
    public decimal ScorePercent(FinAssetsPanel panel) => Score / (panel.TotalScore > 0 ? panel.TotalScore : 1);
    public decimal RecommendedAmount(FinAssetsPanel panel) => ScorePercent(panel) * panel.TotalAmount;
    public decimal AdjustAmount(FinAssetsPanel panel) => RecommendedAmount(panel) - CurrentAmount;
    public decimal BuyScorePercent(FinAssetsPanel panel)
    {
        if (!IsBuy(panel)) return decimal.Zero;


        return Score / (panel.TotalBuyScore > 0 ? panel.TotalBuyScore : 1);
    }

    public decimal BuyRecommendedAmount(FinAssetsPanel panel)
    {
        if (!IsBuy(panel)) return decimal.Zero;


        return CurrentAmount + BuyAdjustAmount(panel);
    }

    public decimal BuyAdjustAmount(FinAssetsPanel panel)
    {
        if (!IsBuy(panel)) return decimal.Zero;

        return BuyScorePercent(panel) * panel.AmountToInvest;
    }

    public decimal TagCurrentAmount(string tag) =>
        Children.Where(x => x.Tag == tag).Sum(x => x.CurrentAmount);

    public bool IsBuy(FinAssetsPanel panel) =>
        AdjustAmount(panel) > 0;

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
