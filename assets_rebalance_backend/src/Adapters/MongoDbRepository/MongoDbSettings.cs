using System;

namespace assets_rebalance_backend.Adapters.MongoDbRepository;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } = string.Empty;
    public string DatabaseName { get; set; } = string.Empty;
}
