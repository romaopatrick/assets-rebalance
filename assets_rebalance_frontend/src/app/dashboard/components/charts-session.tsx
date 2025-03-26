'use client'
import React, { useState } from 'react'
import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel';
import { groupByToSet } from '@/lib/utils/array';
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { categories, categories_keys, FinAssetCategory, finAssetCategoryDictionary } from '@/lib/domain/enums/fin-asset-category.enum';
import { currency_f } from '@/lib/utils/numeric';
import BarChartVestedByCategory from './charts/bar-chart-vested-category';
import PieChartCategoryScores from './charts/pie-chart-category-scores';
import LineChartNextExpirations from './charts/line-chart-next-expirations';

type Props = {
  panel: FinAssetsPanel
}
export default function ChartsSession({ panel }: Props) {
  const [yearFilterValue, setYearFilterValue] = useState<string>()
  const [showTotal, setShowTotal] = useState(true)

  return (
   <section className='flex w-full h-fit gap-4 flex-wrap'>
     <BarChartVestedByCategory panel={panel}/>
     <PieChartCategoryScores panel={panel}/>
     <LineChartNextExpirations panel={panel} onYearSelect={setYearFilterValue}  year={yearFilterValue}  showTotal={showTotal} setShowTotal={setShowTotal}/>
   </section>
  );
}

