using assets_rebalance_backend.Adapters.Base;
using assets_rebalance_backend.Boundaries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace assets_rebalance_backend.Adapters.FinAssetBankAccounts
{
    public class FinAssetBankAccountController(FinAssetBankAccountService service) : AssetsController
    {

        private readonly FinAssetBankAccountService _service = service;
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
        public async Task<IResult> Change([FromBody] ChangeFinAssetBankAccountInput input, CancellationToken cancellationToken = default)
            => ParseResult(await _service.Change(input, cancellationToken));

        [HttpPatch("d/{id:Guid}")]
        public async Task<IResult> Delete([FromRoute] Guid id, CancellationToken cancellationToken = default)
            => ParseResult(await _service.Disable(id, cancellationToken));

        [HttpPatch("e/{id:Guid}")]
        public async Task<IResult> Enable([FromRoute] Guid id, CancellationToken cancellationToken = default)
            => ParseResult(await _service.Enable(id, cancellationToken));

    }
}
