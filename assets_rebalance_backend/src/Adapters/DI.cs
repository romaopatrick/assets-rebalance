using assets_rebalance_backend.Adapters.FinAssetBankAccounts;
using assets_rebalance_backend.Adapters.FinAssetBanks;
using assets_rebalance_backend.Adapters.FinAssetsPanels;
using assets_rebalance_backend.Adapters.Indexer;
using assets_rebalance_backend.Adapters.MongoDbRepository;
using assets_rebalance_backend.Domain;
using assets_rebalance_backend.Ports;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace assets_rebalance_backend.Adapters;

public static class DI
{
    public static IServiceCollection AddApplicationDependencies(this IServiceCollection services, IConfiguration configuration)
        => services

        .Configure<MongoDbSettings>(configuration.GetSection(nameof(MongoDbSettings)))
        .AddSingleton<IMongoClient>(sp =>
        {
            BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));

            var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
            var client = new MongoClient(settings.ConnectionString);
            return client;
        })
        .AddScoped(sp =>
        {
            var client = sp.GetRequiredService<IMongoClient>();
            var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;

            return client.GetDatabase(settings.DatabaseName);
        })

        .AddRepositories()
        .AddServices()
        ;

    private static IServiceCollection AddRepositories(this IServiceCollection services)
        => services.AddMongoDbRepository<FinAssetBank>()
            .AddMongoDbRepository<FinAssetBankAccount>()
            .AddMongoDbRepository<FinAssetsPanel>()
            .AddMongoDbRepository<FinAssetsGroup>()
            .AddMongoDbRepository<FinAsset>();
    private static IServiceCollection AddMongoDbRepository<T>(this IServiceCollection services) where T : Entity
        => services.AddScoped<INoSqlRepository<T>, MongoDbRepository<T>>();

    private static IServiceCollection AddServices(this IServiceCollection services)
        => services.AddScoped<FinAssetBankService>()
            .AddScoped<FinAssetBankAccountService>()
            .AddScoped<FinAssetsPanelService>()
            .AddScoped<IndexerService>();
}
