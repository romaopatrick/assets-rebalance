'use client'
import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel';
import { categories, FinAssetCategory, finAssetCategoryDictionary } from '@/lib/domain/enums/fin-asset-category.enum';
import { groupByToSet } from '@/lib/utils/array';
import { MakeOptional } from '@mui/x-charts/internals';
import { BarSeriesType } from '@mui/x-charts';
type Props = {
  panel: FinAssetsPanel
}
export default function ChartsSession({ panel }: Props) {
  const data = groupByToSet(panel.children, f => f.category)
  const result = data?.keys().map(x => data.get(x)?.values()?.map(x => x.currentAmount)?.reduce((acc, b) => acc += b) ?? 0).toArray()
  const series: MakeOptional<BarSeriesType, 'type'> = {
    data: result,
  }

  console.log("result", result)

  return (
    <BarChart
      series={[series]}
      sx={
        {
          '.MuiChartsAxis-tickLabel': {
            stroke: '#000', // Axis line color
          },
          '.MuiChart-tick': {
            fill: '#ff5733', // Set the tick label color
          },
        }
      }
      xAxis={[
        {
          data: [...categories],
          scaleType: 'band',
         
          colorMap: {
            type: 'ordinal',
            colors: ['#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e']
          },
        }
      ]}

      barLabel={'value'}
      width={500}
      height={300}
    />
  );
}
