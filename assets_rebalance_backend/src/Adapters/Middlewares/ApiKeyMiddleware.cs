using System;

namespace assets_rebalance_backend.Adapters.Middlewares;

public class ApiKeyMiddleware(RequestDelegate next, IConfiguration configuration)
{

    private readonly RequestDelegate _next = next;
    private readonly IConfiguration _configuration = configuration;
    public async Task InvokeAsync(HttpContext context)
    {
        if (!context.Request.Headers.TryGetValue("X-API-KEY", out var extractedApiKey))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("API Key is required");
            return;
        }

        var validApiKey = _configuration.GetValue<string>("ApplicationKey"); // Example key
        if (!string.Equals(extractedApiKey, validApiKey))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return;
        }

        await _next(context);
    }
}
