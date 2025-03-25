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
- Panels Page
- Charts grouping by fin assets groups (refin)
- Charts for groups (refin)

Quick Wins
- [x] Save dates (application, due) from fixed assets
- [x] Line chart for:  Fixed Assets Due Years X Assets
- Line chart for:  Fixed Assets Due Months X Assets
    - Include filter by year
- Alert assets that reached due date but is not with status 'Settled'
- Move charts to detailed panel page
- Move panels list from dashboard to panel page
- Save quantity for variable, cripto, currency, 
- Show average of indexes percentage (14% a.a., 105% from CDI, IPCA + 5%)

Features
- Take Snapshots
    - Should take a snapshot for updates grouped by month+asset, so my asset can only have one registered snapshot by month
- Snapshots line Chart


