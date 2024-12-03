.PHONY: dev bk-run-dev fr-run-dev

BACK_PATH=./assets_rebalance_backend/assets_rebalance_backend.csproj
FRONT_PATH=./assets_rebalance_frontend

bk-run-dev: 
	@echo "Starting backend..."
	dotnet run -p $(BACK_PATH)

fr-run-dev: 
	@echo "Starting frontend..."
	cd $(FRONT_PATH) && yarn dev

dev:
	$(MAKE) -j bk-run-dev fr-run-dev
