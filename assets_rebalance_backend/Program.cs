

using assets_rebalance_backend.src.Adapters;
using FluentResults;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddApplicationDependencies(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddCors();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Assets Rebalance API",
        Version = "v1",
        Description = "API for managing assets rebalancing"
    });
});

var app = builder.Build();

    app.UseSwagger();
    app.UseSwaggerUI();

app.UseCors(opts => {
    opts.AllowAnyMethod()
        .AllowAnyHeader()
        .AllowAnyOrigin();
});

app.MapControllers();

app.Run();
