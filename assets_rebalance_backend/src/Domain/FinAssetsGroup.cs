using assets_rebalance_backend.src.Domain.Enums;
using FluentResults;

namespace assets_rebalance_backend.src.Domain;

public class FinAssetsGroup
{
    public required string Name { get; set; }
    public required int Score { get; set; }
    public IEnumerable<FinAsset> Children { get; set; } = [];
    public decimal CurrentAmount => Children.Sum(x => x.CurrentAmount);
    public decimal ScorePercent => (decimal)Score / 100;
    public required FinAssetCategory Category { get; set; }

    public Result Validate()
    {
        if (Children
            .GroupBy(x => new { x.Tag, x.Score })
            .Sum(x => x.First().Score) != 100)
            return Result.Fail("group children score must sum 100");

        return Result.Ok();
    }
}
