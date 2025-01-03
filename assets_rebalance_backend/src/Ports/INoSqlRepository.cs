using System.Linq.Expressions;
using assets_rebalance_backend.Domain;
using FluentResults;

namespace assets_rebalance_backend.Ports;

public interface INoSqlRepository<T> where T : Entity
{
    Task<Result<T>> First(Expression<Func<T, bool>> filter, CancellationToken t = default);
    Task<Result<IEnumerable<T>>> List(Expression<Func<T, bool>> filter, CancellationToken t = default);
    Task<Result<T>> Update(T entity, CancellationToken t = default);
    Task<Result<T>> Insert(T entity, CancellationToken t = default);
    Task<Result> Disable(Guid id, CancellationToken t = default);
    Task<Result> Enable(Guid id, CancellationToken t = default);
}
