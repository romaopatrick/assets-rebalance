FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

COPY assets_rebalance_backend/ ./assets_rebalance_backend/

WORKDIR /app/assets_rebalance_backend
RUN dotnet restore

RUN dotnet publish -c Release -r linux-x64 --self-contained -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

RUN chmod +x ./assets_rebalance_backend.dll

EXPOSE 8080

ENTRYPOINT ["dotnet", "./assets_rebalance_backend.dll"]