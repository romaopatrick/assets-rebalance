using System;
using FluentResults;

namespace assets_rebalance_backend.Boundaries;

public class ResultOutput<T> : ResultOutput
{
    public T? Value { get; set; }
}

public class ResultOutput
{
    public bool Success { get; set; }
    public IEnumerable<ErrorOutput> Errors { get; set; } = [];
    public static ResultOutput<T> FromResult<T>(Result<T> r) => new()
    {
        Success = r.IsSuccess,
        Errors = r.IsFailed ? r.Errors.Select(static x => new ErrorOutput { Message = x.Message }) : [],
        Value = r.IsSuccess ? r.Value : default,
    };
    public static ResultOutput FromResult(Result r) => new()
    {
        Success = r.IsSuccess,
        Errors = r.IsFailed ? r.Errors.Select(static x => new ErrorOutput { Message = x.Message }) : [],
    };
}

public class ErrorOutput
{
    public required string Message { get; set; }
}