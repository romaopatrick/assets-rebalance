.PHONY: dev bk-run-dev fr-run-dev
TAG=latest
BACK_PATH=./assets_rebalance_backend/assets_rebalance_backend.csproj
FRONT_PATH=./assets_rebalance_frontend

bk-run-dev: 
	@echo "Starting backend..."
	dotnet run --project $(BACK_PATH)

fr-run-dev: 
	@echo "Starting frontend..."
	cd $(FRONT_PATH) && yarn dev

dev:
	$(MAKE) -j bk-run-dev fr-run-dev

push-back-image:
	@echo "starting deployment: patrickromao/assetsrebalancebackend:$(TAG)"
	docker build -t patrickromao/assetsrebalancebackend:$(TAG) -f ./assets_rebalance_backend/Dockerfile .
	docker push patrickromao/assetsrebalancebackend:$(TAG)

push-front-image:
	@echo "starting deployment: patrickromao/assetsrebalancefrontend:$(TAG)"
	docker build -t patrickromao/assetsrebalancefrontend:$(TAG) -f ./assets_rebalance_frontend/Dockerfile .
	docker push patrickromao/assetsrebalancefrontend:$(TAG)