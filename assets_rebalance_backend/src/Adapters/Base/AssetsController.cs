using System.Net;
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
                    : Results.Json(result.Value, statusCode: (int?)successCode)
                : Results.BadRequest(result.Errors);
        protected IResult ParseResult(Result result, HttpStatusCode? successCode = HttpStatusCode.OK)
            => result.IsSuccess
                ? Results.NoContent()
                : Results.BadRequest(result.Errors);
    }
}
