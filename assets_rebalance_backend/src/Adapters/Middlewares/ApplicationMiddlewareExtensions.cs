namespace assets_rebalance_backend.Adapters.Middlewares;

public static class ApplicationMiddlewareExtensions
{
    public static IApplicationBuilder UseApplicationMiddlewares(this IApplicationBuilder app)
        => app.UseMiddleware<ApiKeyMiddleware>(); 
}
