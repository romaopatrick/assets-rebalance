using assets_rebalance_backend.Domain;
using AutoFixture;

namespace assets_rebalance_backend_tests.Domain
{
    public class FinAssetTests()
    {
        private readonly IFixture _fixture = new Fixture();

        [Fact]
        public void Should_Calculate_Score_Percent()
        {
            var asset = _fixture.Build<FinAsset>()
                .With(x => x.CurrentAmount, 100)
                .With(x => x.CurrentQuantity, 100)
                .With(x => x.Score, 10)
                .Create();

            var group = _fixture.Build<FinAssetsGroup>()
                .With(x => x.Children, [asset])
                .Create();


            var got = asset.ScorePercent(group);
            var expected = 1;

            Assert.Equal(expected, got);
        }

        [Fact]
        public void Should_Calculate_Recommended_Amount()
        {
            var asset = _fixture
                .Build<FinAsset>()
                    .With(x => x.CurrentAmount, 100)
                    .With(x => x.Score, 50)
                .Create();

            var group = _fixture
                .Build<FinAssetsGroup>()
                    .With(x => x.Score, 100)
                    .With(x => x.Children, [asset, asset])
                .Create();

            var panel = _fixture
                .Build<FinAssetsPanel>()
                    .With(x => x.AmountToInvest, 100)                
                    .With(x => x.Children, [group])
                .Create();

            var got = asset.RecommendedAmount(group, panel);

            var expected = 150;
            
            Assert.Equal(expected, got);
        }
        
        [Fact]
        public void Should_Calculate_Adjust_Amount()
        {
            var asset = _fixture
                .Build<FinAsset>()
                    .With(x => x.CurrentAmount, 100)
                    .With(x => x.Score, 100)
                .Create();

            var group = _fixture
                .Build<FinAssetsGroup>()
                    .With(x => x.Score, 50)
                    .With(x => x.Children, [asset])
                .Create();

            var panel = _fixture
                .Build<FinAssetsPanel>()
                    .With(x => x.AmountToInvest, 150)                
                    .With(x => x.Children, [group])
                .Create();

            var got = asset.AdjustAmount(group, panel);

            var expected = 150;
            
            Assert.Equal(expected, got);
        }
    }
}