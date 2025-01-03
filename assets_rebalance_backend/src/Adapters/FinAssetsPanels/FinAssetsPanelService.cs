using System;
using System.Text.RegularExpressions;
using assets_rebalance_backend.Boundaries;
using assets_rebalance_backend.Domain;
using assets_rebalance_backend.Domain.Enums;
using assets_rebalance_backend.Ports;
using FluentResults;
using ZstdSharp.Unsafe;

namespace assets_rebalance_backend.Adapters.FinAssetsPanels;

public class FinAssetsPanelService(
    INoSqlRepository<FinAssetBankAccount> account_repository,
    INoSqlRepository<FinAsset> assets_repository,
    INoSqlRepository<FinAssetsGroup> group_repository,
    INoSqlRepository<FinAssetsPanel> repository)
{
    private readonly INoSqlRepository<FinAssetBankAccount> _account_repository = account_repository;
    private readonly INoSqlRepository<FinAsset> _assets_repository = assets_repository;
    private readonly INoSqlRepository<FinAssetsGroup> _group_repository = group_repository;
    private readonly INoSqlRepository<FinAssetsPanel> _repository = repository;

    public async Task<Result<IEnumerable<GetFinAssetPanelOutput>>> ListAll(bool activeOnly, CancellationToken ct = default)
    {
        var panelR = await _repository.List(x => !activeOnly || x.Enabled, ct);
        if (panelR.IsFailed)
            return panelR.ToResult<IEnumerable<GetFinAssetPanelOutput>>();

        var panelIds = panelR.Value.Select(x => x.Id);

        var groupsR = await _group_repository.List(group
            => group.Enabled && panelIds.Any(panelId => panelId == group.PanelId), ct);
        if (groupsR.IsFailed)
            return groupsR.ToResult<IEnumerable<GetFinAssetPanelOutput>>();

        var assetsR = await _assets_repository.List(asset
            => asset.Status == FinAssetStatus.Active 
            && panelIds.Any(panelId 
                => panelId == asset.PanelId), 
            ct);
        if (assetsR.IsFailed)
            return assetsR.ToResult<IEnumerable<GetFinAssetPanelOutput>>();

        var result = panelR.ValueOrDefault.Select(panel =>
        {
            var groups = groupsR.Value.Where(group => group.PanelId == panel.Id).Select(group =>
            {
                group.Children = assetsR.Value.Where(asset => asset.GroupId == group.Id);

                return group;
            });

            panel.Children = groups;

            return GetFinAssetPanelOutput.FromDomain(panel);
        });

        return Result.Ok(result);
    }

    public async Task<Result<GetFinAssetPanelOutput>> FirstById(GetFinAssetPanelByIdInput input, CancellationToken ct = default)
    {
        var panelR = await _repository.First(x => x.Id.Equals(input.Id) && x.Enabled, ct);
        if (panelR.IsFailed)
            return panelR.ToResult<GetFinAssetPanelOutput>();

        var groupsR = await _group_repository.List(x => x.Enabled && x.PanelId == input.Id, ct);
        if (groupsR.IsFailed)
            return groupsR.ToResult<GetFinAssetPanelOutput>();

        var assetsR = await _assets_repository.List(x
            => x.Enabled
            && x.PanelId == input.Id
            && x.Status == FinAssetStatus.Active, 
            ct);
        if (assetsR.IsFailed)
            return assetsR.ToResult<GetFinAssetPanelOutput>();

        var panel = panelR.Value;

        panel.Children = groupsR.Value.Select(group =>
        {
            group.Children = assetsR.Value.Where(asset => asset.GroupId == group.Id);
            return group;
        });

        var result = GetFinAssetPanelOutput.FromDomain(panel);

        return Result.Ok(result);
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

        var panelR = await _repository.Update(fin_assets_panel, ct);
        if (panelR.IsFailed)
            return panelR.ToResult<GetFinAssetPanelOutput>();


        var groupsR = await SaveGroups(fin_assets_panel.Id, fin_assets_panel.Children, ct);
        if (groupsR.IsFailed)
            return groupsR.ToResult<GetFinAssetPanelOutput>();

        var assets = fin_assets_panel.Children.SelectMany(x => x.Children.Select(asset =>
        {
            asset.GroupId = x.Id;
            asset.PanelId = fin_assets_panel.Id;
            return asset;
        }));

        var assetsR = await SaveAssets(assets, ct);
        if (assetsR.IsFailed)
            return assetsR.ToResult<GetFinAssetPanelOutput>();

        return Result.Ok(GetFinAssetPanelOutput.FromDomain(panelR.Value));
    }

    private async Task<Result> SaveGroups(Guid panelId, IEnumerable<FinAssetsGroup> groups, CancellationToken ct = default)
    {
        foreach (var group in groups)
        {
            group.PanelId = panelId;
            var groupR = await _group_repository.Update(group, ct);
            if (groupR.IsFailed)
                return groupR.ToResult();
        }

        return Result.Ok();
    }

    private async Task<Result> SaveAssets(IEnumerable<FinAsset> assets, CancellationToken ct = default)
    {
        foreach (var asset in assets)
        {
            var assetR = await _assets_repository.Update(asset, ct);

            if (assetR.IsFailed)
                return assetR.ToResult();
        }
        return Result.Ok();
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
