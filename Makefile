fr-run-dev: 
	$(shell cd ./assets_rebalance_frontend && npm run dev)
bk-run-dev:
	$(shell dotnet run -p ./assets_rebalance_backend/assets_rebalance_backend.csproj)