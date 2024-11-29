using System.Net;
using assets_rebalance_backend.src.Boundaries;
using FluentResults;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace assets_rebalance_backend.src.Adapters.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        protected IResult ParseResult<T>(Result<T> result, HttpStatusCode? successCode = HttpStatusCode.OK)
            => result.IsSuccess
                ? result.ValueOrDefault is null
                    ? Results.NoContent()
                    : Results.Json(ResultOutput.FromResult(result), statusCode: (int?)successCode)
                : Results.BadRequest(ResultOutput.FromResult(result));
        protected IResult ParseResult(Result result, HttpStatusCode? successCode = HttpStatusCode.OK)
            => result.IsSuccess
                ? Results.NoContent()
                : Results.BadRequest(ResultOutput.FromResult(result));
    }
}
