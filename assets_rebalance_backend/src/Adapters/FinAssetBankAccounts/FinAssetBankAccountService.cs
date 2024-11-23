using assets_rebalance_backend.src.Boundaries;
using assets_rebalance_backend.src.Domain;
using assets_rebalance_backend.src.Ports;
using FluentResults;

namespace assets_rebalance_backend.src.Adapters.FinAssetBankAccounts;

public class FinAssetBankAccountService(
    INoSqlRepository<FinAssetBank> bank_repository,
    INoSqlRepository<FinAssetBankAccount> repository)
{
    private readonly INoSqlRepository<FinAssetBank> _bank_repository = bank_repository;
    private readonly INoSqlRepository<FinAssetBankAccount> _repository = repository;

    public async Task<Result<IEnumerable<FinAssetBankAccount>>> ListAll(bool activeOnly, CancellationToken ct = default)
    {
        var result = await _repository.List(x => !activeOnly || x.Enabled, ct);
        return result;
    }
    public async Task<Result<FinAssetBankAccount>> FirstById(Guid id, CancellationToken cancellationToken)
    {
        var result = await _repository.First(x => x.Id.Equals(id), cancellationToken);
        
        return result;
    }

    public async Task<Result<FinAssetBankAccount>> Change(ChangeFinAssetBankAccountInput input, CancellationToken ct = default)
    {
        var bank = await _bank_repository.First(x => x.Id.Equals(input.BankId) && x.Enabled, ct);
        if (!bank.IsSuccess)
            return bank.ToResult<FinAssetBankAccount>();

        var account = input.Domain(bank.ValueOrDefault);

        var result = await _repository.Update(account, ct);

        return result;
    }

    public async Task<Result<FinAssetBankAccount>> Disable(Guid id, CancellationToken ct = default)
    {
        var result = await _repository.Disable(id, ct);

        return result;
    }

    public async Task<Result<FinAssetBankAccount>> Enable(Guid id, CancellationToken ct = default)
    {
        var result = await _repository.Enable(id, ct);

        return result;
    }

}
