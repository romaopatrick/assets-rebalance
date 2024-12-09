using assets_rebalance_backend.src.Adapters.Base;
using assets_rebalance_backend.src.Boundaries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace assets_rebalance_backend.src.Adapters.FinAssetBanks
{
    
    public class FinAssetBankController(FinAssetBankService service) : AssetsController
    {
        private readonly FinAssetBankService _service = service;
        [HttpGet("all")]
        public async Task<IResult> All(
            [FromQuery] bool activeOnly = false,
            CancellationToken cancellationToken = default)
            => ParseResult(await _service.ListAll(activeOnly, cancellationToken));
        [HttpGet("{id:Guid}")]
        public async Task<IResult> FirstById(
            [FromRoute] Guid id,
            CancellationToken cancellationToken = default)
            => ParseResult(await _service.FirstById(id, cancellationToken));



        [HttpPut]
        public async Task<IResult> Change([FromBody] ChangeFinAssetBankInput input, CancellationToken cancellationToken = default)
            => ParseResult(await _service.Change(input, cancellationToken));

        [HttpPatch("d/{id:Guid}")]
        public async Task<IResult> Disable([FromRoute] Guid id, CancellationToken cancellationToken = default)
            => ParseResult(await _service.Disable(id, cancellationToken));

        [HttpPatch("e/{id:Guid}")]
        public async Task<IResult> Enable([FromRoute] Guid id, CancellationToken cancellationToken = default)
            => ParseResult(await _service.Enable(id, cancellationToken));

    }
}
