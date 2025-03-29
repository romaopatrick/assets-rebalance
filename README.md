# assets-rebalance
mono-repo for assets rebalance

## Docker
#### BACK
docker build -t assets-rebalance-backend -f assets_rebalance_backend/Dockerfile .
docker run -p 5237:5237 assets-rebalance-backend

#### FRONT


## Makefile
mk dev

## TODO List
To Think On:
- Charts grouping by fin assets groups (refin)
- Charts for groups (refin)

Features
- Take Snapshots
    - Should take a snapshot for updates grouped by month+asset, so my asset can only have one registered snapshot by month
- Snapshots line Chart
- Auto-sync quotations with B3 
- Auto-close settled fixed
