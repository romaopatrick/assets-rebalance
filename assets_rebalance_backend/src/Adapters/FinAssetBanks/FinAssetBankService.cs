using System.Runtime.CompilerServices;
using assets_rebalance_backend.src.Boundaries;
using assets_rebalance_backend.src.Domain;
using assets_rebalance_backend.src.Ports;
using FluentResults;

namespace assets_rebalance_backend.src.Adapters.FinAssetBanks;

public class FinAssetBankService(INoSqlRepository<FinAssetBank> repository)
{
    private readonly INoSqlRepository<FinAssetBank> _repository = repository;

    public async Task<Result<FinAssetBank>> Change(ChangeFinAssetBankInput input, CancellationToken cancellationToken)
    {
        var result = await _repository.Update(input.Domain(), cancellationToken);

        return result;
    }

    public async Task<Result<IEnumerable<FinAssetBank>>> ListAll(bool activeOnly, CancellationToken cancellationToken)
    {
        return await _repository.List(x => !activeOnly || x.Enabled, cancellationToken);
    }
    public async Task<Result<FinAssetBank>> FirstById(Guid id, CancellationToken cancellationToken)
    {
        var result = await _repository.First(x => x.Id.Equals(id), cancellationToken);
        
        return result;
    }

    public async Task<Result> Disable(Guid Id, CancellationToken cancellationToken)
    {
        return await _repository.Disable(Id, cancellationToken);
    }
    public async Task<Result> Enable(Guid Id, CancellationToken cancellationToken)
    {
        return await _repository.Enable(Id, cancellationToken);
    }
}