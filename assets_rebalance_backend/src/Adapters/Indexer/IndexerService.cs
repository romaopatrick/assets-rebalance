using assets_rebalance_backend.Boundaries;
using FluentResults;
using Refit;

namespace assets_rebalance_backend.Adapters.Indexer;

public interface IIndexerClient
{
    [Get("/api/odata4/ValoresSerie(SERCODIGO='PAN12_IPCAG12')")]
    Task<IndexerDataResponse> GetIpcaDataAsync();
    [Get("/api/odata4/ValoresSerie(SERCODIGO='PAN12_TJOVER12')")]
    Task<IndexerDataResponse> GetCDIDataAsync();
}
public class IndexerService
{
    private readonly IIndexerClient indexerClient = RestService.For<IIndexerClient>("http://ipeadata.gov.br");

    public async Task<Result<decimal>> GetIPCAAverage()
    {
        var data = await indexerClient.GetIpcaDataAsync();
        if (data?.Value is null || data.Value.Count == 0)
            return Result.Fail("No IPCA data available.");

        var dateLimit = DateTime.Now.AddMonths(-12);
        var last12MonthsData = data.Value
            .Where(x => x.Date >= dateLimit)
            .Select(x => x.Value)
            .ToList();

        if (last12MonthsData.Count == 0)
            return Result.Fail("No IPCA data found for the last 12 months.");

        var averageValue = last12MonthsData.Average();

        return averageValue;
    }

    public async Task<Result<decimal>> GetCDIAverage()
    {
        var data = await indexerClient.GetCDIDataAsync();
        if (data?.Value is null || data.Value.Count == 0)
            return Result.Fail("No CDI data available.");

        var dateLimit = DateTime.Now.AddMonths(-12);
        var last12MonthsData = data.Value
            .Where(x => x.Date >= dateLimit)
            .Select(x => x.Value)
            .ToList();

        if (last12MonthsData.Count == 0)
            return Result.Fail("No CDI data found for the last 12 months.");

        var averageValue = last12MonthsData.Average();

        return averageValue;
    }
}
