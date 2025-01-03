using assets_rebalance_backend.Domain;
using assets_rebalance_backend.Domain.Enums;
using AutoFixture;

namespace assets_rebalance_backend_tests.Domain;

public class FinAssetsGroupTests
{
    private readonly IFixture _fixture = new Fixture();

    [Fact]
    public void Should_Calculate_Tag_Current_Amount()
    {
        var asset = _fixture.Build<FinAsset>()
                            .With(x => x.CurrentAmount, 100)
                            .With(x => x.Tag, "TEST")
                            .With(x => x.Score, 0.5M)
                            .Create();
        var asset_2 = _fixture.Build<FinAsset>()
                            .With(x => x.CurrentAmount, 50)
                            .With(x => x.Tag, "TEST2")
                            .With(x => x.Score, 0.5M)
                            .Create();

        var group = _fixture.Build<FinAssetsGroup>()
                            .With(x => x.Score, 50)
                            .With(x => x.Children, [asset, asset])
                            .Create();
        
        var expected = 200;
        var got = group.TagCurrentAmount("TEST");

        Assert.Equal(expected, got);
    }

    [Fact]
    public void Should_Calculate_Current_Amount()
    {
        var asset = _fixture.Build<FinAsset>()
                            .With(x => x.CurrentAmount, 100)
                            .With(x => x.Score, 0.5M)
                            .Create();

        var group = _fixture.Build<FinAssetsGroup>()
                            .With(x => x.Score, 50)
                            .With(x => x.Children, [asset, asset])
                            .Create();
        
        var expected = 200;
        var got = group.CurrentAmount;

        Assert.Equal(expected, got);
    }


    [Fact]
    public void Should_Calculate_Score_Percent()
    {
        var group = _fixture.Build<FinAssetsGroup>()
                            .With(x => x.Score, 50)
                            .Create();

        var panel = _fixture.Build<FinAssetsPanel>()
                            .With(x => x.Children, [group])
                            .Create();


        var expected = 1;

        var got = group.ScorePercent(panel.TotalScore);

        Assert.Equal(expected, got);
    }

    [Fact]
    public void Should_Calculate_Score_Percent_With_Two_Children()
    {
        var group = _fixture.Build<FinAssetsGroup>()
                            .With(x => x.Score, 50)
                            .Create();

        var panel = _fixture.Build<FinAssetsPanel>()
                            .With(x => x.Children,
                            [
                                group,
                                _fixture.Build<FinAssetsGroup>()
                                        .With(x => x.Score, 100)
                                        .Create()
                            ])
                            .Create();


        var expected = 1M / 3M;

        var got = group.ScorePercent(panel.TotalScore);

        Assert.Equal(expected, got);
    }

    [Fact]
    public void Should_Calculate_Recommended_Amount()
    {
        var asset = _fixture.Build<FinAsset>()
                            .With(x => x.CurrentAmount, 100)
                            .With(x => x.Score, 0.5M)
                            .Create();

        var group = _fixture.Build<FinAssetsGroup>()
                            .With(x => x.Score, 50)
                            .With(x => x.Children, [asset, asset])
                            .Create();

        var panel = _fixture.Build<FinAssetsPanel>()
                            .With(x => x.Children,
                            [
                                group,
                                group,
                            ])
                            .With(x => x.AmountToInvest, 100)
                            .Create();

        var got = group.RecommendedAmount(panel);
        var expected = 250;

        Assert.Equal(expected, got);
    }

    [Fact]
    public void Should_Calculate_Adjust_Amount()
    {
        var asset = _fixture.Build<FinAsset>()
                            .With(x => x.CurrentAmount, 100)
                            .With(x => x.Score, 0.5M)
                            .Create();

        var group = _fixture.Build<FinAssetsGroup>()
                            .With(x => x.Score, 50)
                            .With(x => x.Children, [asset, asset])
                            .Create();

        var panel = _fixture.Build<FinAssetsPanel>()
                            .With(x => x.Children,
                            [
                                group,
                                group,
                            ])
                            .With(x => x.AmountToInvest, 100)
                            .Create();

        var got = group.AdjustAmount(panel);
        var expected = 50;

        Assert.Equal(expected, got);
    }
    [Fact]
    public void Should_Calculate_Adjust_Amount_Tag()
    {
        var asset = _fixture.Build<FinAsset>()
                            .With(x => x.CurrentAmount, 100)
                            .With(x => x.Tag, "TEST")
                            .With(x => x.Category, FinAssetCategory.Fixed)
                            .With(x => x.Score, 0.5M)
                            .Create();

        var group = _fixture.Build<FinAssetsGroup>()
                            .With(x => x.Score, 50)
                            .With(x => x.Children, [asset, asset])
                            .Create();

        var panel = _fixture.Build<FinAssetsPanel>()
                            .With(x => x.Children,
                            [
                                group,
                                group,
                            ])
                            .With(x => x.AmountToInvest, 100)
                            .Create();

        var got = group.AdjustAmount(panel);
        var expected = 50;

        Assert.Equal(expected, got);
    }
}
