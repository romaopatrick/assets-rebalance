'use client'

import React, { useState } from 'react'
import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel';
import BarChartVestedByCategory from './bar-chart-vested-category';
import PieChartCategoryScores from './pie-chart-category-scores';
import LineChartNextExpirations from './line-chart-next-expirations';

type Props = {
  panel: FinAssetsPanel
}

export default function ChartsSession({ panel }: Props) {
  const [year, setYear] = useState('')
  const [showTotal, setShowTotal] = useState(false)

  return (
    <section className='flex w-full h-fit gap-4 flex-wrap'>
      <LineChartNextExpirations panel={panel} year={year} setYear={setYear} showTotal={showTotal} setShowTotal={setShowTotal}/>
      <PieChartCategoryScores panel={panel} />
      <BarChartVestedByCategory panel={panel} />
    </section>
  );
}

