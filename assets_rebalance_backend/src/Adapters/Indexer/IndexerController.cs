using assets_rebalance_backend.Adapters.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace assets_rebalance_backend.Adapters.Indexer
{

    public class IndexerController(IndexerService indexerService) : AssetsController
    {
        private readonly IndexerService _indexerService = indexerService;


        [HttpGet("ipca")]
        [OutputCache(Duration = 86400)]
        public async Task<IResult> IPCA()
        {
            return ParseResult(await _indexerService.GetIPCAAverage());
        }
        
        [HttpGet("cdi")]
        [OutputCache(Duration = 86400)]
        public async Task<IResult> CDI()
        {
            return ParseResult(await _indexerService.GetCDIAverage());
        }

    }
}
