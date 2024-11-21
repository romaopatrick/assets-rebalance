using System.Linq.Expressions;
using assets_rebalance_backend.src.Domain;
using assets_rebalance_backend.src.Ports;
using FluentResults;
using MongoDB.Driver;

namespace assets_rebalance_backend.src.Adapters.MongoDbRepository;

public class MongoDbRepository<T>(IMongoDatabase db) : INoSqlRepository<T> where T : Entity
{
    private static readonly string _collection_name = typeof(T).Name;
    private readonly IMongoCollection<T> _collection = db.GetCollection<T>(_collection_name);

    public async Task<Result> Disable(Guid id, CancellationToken t = default)
    {

        var builder = Builders<T>.Update
            .Set(e => e.Enabled, false)
            .Set(e => e.DisabledAt, DateTime.Now);

        var result = await _collection.UpdateOneAsync(e => e.Id.Equals(id), builder, null, t);

        return Result.FailIf(result.ModifiedCount <= 0, $"disable did not modified any {_collection_name}");
    }

    public async Task<Result> Enable(Guid id, CancellationToken t = default)
    {
        var builder = Builders<T>.Update
            .Set(e => e.Enabled, true)
            .Set(e => e.DisabledAt, null);

        var result = await _collection.UpdateOneAsync(e => e.Id.Equals(id), builder, null, t);

        return Result.FailIf(result.ModifiedCount <= 0, $"enable did not modified any {_collection_name}");
    }

    public async Task<Result<T>> First(Expression<Func<T, bool>> filter, CancellationToken t = default)
    {
        var predicate = Builders<T>.Filter.Where(filter);
        var entity = await _collection.Find(predicate).FirstOrDefaultAsync(t);

        return entity == null
            ? Result.Fail($"could not found any {_collection_name} with filter")
            : Result.Ok(entity);
    }

    public async Task<Result<T>> Insert(T entity, CancellationToken t = default)
    {
        entity.Enabled = true;
        var options = new InsertOneOptions
        {
            BypassDocumentValidation = true,
        };
        await _collection.InsertOneAsync(entity, options, t);

        return Result.Ok(entity);
    }

    public async Task<Result<IEnumerable<T>>> List(Expression<Func<T, bool>> filter, CancellationToken t = default)
    {
        var predicate = Builders<T>.Filter.Where(filter);
        var entity = await _collection.Find(predicate).ToListAsync(t);

        return Result.Ok(entity.AsEnumerable());
    }

    public async Task<Result<T>> Update(T entity, CancellationToken t = default)
    {
        entity.Enabled = true;
        entity.UpdatedAt = DateTime.Now;

        var builder = Builders<T>.Filter.Where(x => x.Id.Equals(entity.Id));
        var options = new ReplaceOptions
        {
            BypassDocumentValidation = true,
            IsUpsert = true
        };

        var result = await _collection.ReplaceOneAsync(builder, entity, options, t);

        return result.ModifiedCount > 0 || result.UpsertedId is not null
            ? Result.Ok(entity)
            : Result.Fail($"replace did not modified any {_collection_name}");
    }
}
