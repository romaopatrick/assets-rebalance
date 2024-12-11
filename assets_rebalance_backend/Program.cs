using System.Threading.RateLimiting;
using assets_rebalance_backend.src.Adapters;
using assets_rebalance_backend.src.Adapters.Middlewares;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddApplicationDependencies(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddRateLimiter(cfg =>
{
    cfg.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    cfg.AddPolicy("default", ctx =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: ctx.Connection.RemoteIpAddress?.ToString(),
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 100,
                Window = TimeSpan.FromSeconds(1),
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 0,
            }));
});
builder.Services.AddCors();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("ApiKey", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.ApiKey,
        Name = "X-API-KEY",
        In = ParameterLocation.Header,
        Description = "API Key Authentication"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "ApiKey",
                }
            },
            []
        }
    });

    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Assets Rebalance API",
        Version = "v1",
        Description = "API for managing assets rebalancing",
    });
});

builder.Services.AddHealthChecks()
    .AddCheck("health", () => HealthCheckResult.Healthy());

var app = builder.Build();

app
    .UseSwagger()
    .UseSwaggerUI();

app
    .UseRateLimiter()
    .UseCors(opts =>
    {
        opts.AllowAnyMethod()
            .AllowAnyHeader()
            .AllowAnyOrigin();
    })
    .UseApplicationMiddlewares();

app.MapHealthChecks("/health");

app.MapControllers().RequireRateLimiting("default");
app.Run();
