using System;
using System.Text.RegularExpressions;
using assets_rebalance_backend.src.Boundaries;
using assets_rebalance_backend.src.Domain;
using assets_rebalance_backend.src.Ports;
using FluentResults;

namespace assets_rebalance_backend.src.Adapters.FinAssetsPanels;

public class FinAssetsPanelService(
    INoSqlRepository<FinAssetBankAccount> account_repository,
    INoSqlRepository<FinAssetsPanel> repository)
{
    private readonly INoSqlRepository<FinAssetBankAccount> _account_repository = account_repository;
    private readonly INoSqlRepository<FinAssetsPanel> _repository = repository;

    public async Task<Result<IEnumerable<GetFinAssetPanelOutput>>> ListAll(bool activeOnly, CancellationToken ct = default)
    {
        var result = await _repository.List(x => !activeOnly || x.Enabled, ct);
        if (result.IsFailed)
            return result.ToResult<IEnumerable<GetFinAssetPanelOutput>>();


        return Result.Ok(result.ValueOrDefault.Select(x => GetFinAssetPanelOutput.FromDomain(x)));
    }

    public async Task<Result<GetFinAssetPanelOutput>> FirstById(Guid id, CancellationToken ct = default)
    {
        var result = await _repository.First(x => x.Id.Equals(id) && x.Enabled, ct);
        if (result.IsFailed)
            return result.ToResult<GetFinAssetPanelOutput>();

        return Result.Ok(GetFinAssetPanelOutput.FromDomain(result.Value));
    }
    public async Task<Result<GetFinAssetPanelOutput>> Change(ChangeFinAssetsPanelInput input, CancellationToken ct = default)
    {
        var fin_assets_panel = input.Domain();
        var validation = fin_assets_panel.Validate();
        if (validation.IsFailed)
            return validation;

        validation = await ValidatePanelAccounts(fin_assets_panel, ct);
        if (validation.IsFailed)
            return validation;

        var result = await _repository.Update(fin_assets_panel, ct);

        if (result.IsFailed)
            return result.ToResult<GetFinAssetPanelOutput>();

        return Result.Ok(GetFinAssetPanelOutput.FromDomain(result.Value));
    }

    private async Task<Result> ValidatePanelAccounts(FinAssetsPanel fin_assets_panel, CancellationToken ct = default)
    {
        var account_ids = fin_assets_panel.AllAccountIds();
        var accounts_r = await _account_repository.List(x
           => account_ids
               .Any(acc_id => x.Id.Equals(acc_id)) && x.Enabled, ct);
        if (accounts_r.IsFailed)
            return accounts_r.ToResult();

        var not_found_accounts = account_ids
            .Where(acc_id => accounts_r.ValueOrDefault.All(acc => !acc.Id.Equals(acc_id)));

        if (not_found_accounts.Any())
            return Result.Fail($"following account ids not found: {not_found_accounts}");

        return Result.Ok();
    }
    public async Task<Result> Disable(Guid id, CancellationToken ct = default)
    {
        var result = await _repository.Disable(id, ct);

        return result;
    }
    public async Task<Result> Enable(Guid id, CancellationToken ct = default)
    {
        var result = await _repository.Enable(id, ct);

        return result;
    }
}
