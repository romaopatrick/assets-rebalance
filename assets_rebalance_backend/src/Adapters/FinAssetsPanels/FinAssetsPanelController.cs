using assets_rebalance_backend.Adapters.Base;
using assets_rebalance_backend.Boundaries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace assets_rebalance_backend.Adapters.FinAssetsPanels
{
    public class FinAssetsPanelController (FinAssetsPanelService service) : AssetsController
    {
        private readonly FinAssetsPanelService _service = service;

        [HttpGet("{id:Guid}")]
        public async Task<IResult> FirstById(
            [FromRoute] Guid id,
            [FromQuery] bool removeDebitAdjusts,
            CancellationToken cancellationToken = default)
            => ParseResult(await _service.FirstById(new(){
                Id = id,
                RemoveDebitAdjusts = removeDebitAdjusts,
            }, cancellationToken));
            
        [HttpGet("all")]
        public async Task<IResult> All(
            [FromRoute] bool activeOnly = false,
            CancellationToken cancellationToken = default)
            => ParseResult(await _service.ListAll(activeOnly, cancellationToken));

        [HttpPut]
        public async Task<IResult> Change([FromBody] ChangeFinAssetsPanelInput input, CancellationToken cancellationToken = default)
            => ParseResult(await _service.Change(input, cancellationToken));

        [HttpPatch("d/{id:Guid}")]
        public async Task<IResult> Disable([FromRoute] Guid id, CancellationToken cancellationToken = default)
            => ParseResult(await _service.Disable(id, cancellationToken));

        [HttpPatch("e/{id:Guid}")]
        public async Task<IResult> Enable([FromRoute] Guid id, CancellationToken cancellationToken = default)
            => ParseResult(await _service.Enable(id, cancellationToken));
    }
}
