import { finAssetCategoryDictionary } from '@/lib/domain/enums/fin-asset-category.enum'
import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel'
import { groupByToSet } from '@/lib/utils/array'
import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts'
type Props = {
  panel: FinAssetsPanel
}

export default function PieChartCategoryScores({ panel }: Props) {
  const data = groupByToSet(panel.children, (g) => g.category).entries().map(([k, v]) => ({
    category: k,
    score: v.values().reduce((acc, b) => acc += b.score, 0)
  })).toArray()
  console.log("data", data)
  return (
    <div className='w-[30%] h-52 rounded-xl border border-slate-400 px-5 pb-6 pt-5'>
      <span className='text-slate-400 font-bold italic'>Score x Category</span>
      <ResponsiveContainer>
        <PieChart >
          <defs>
            {/* Define the new gradients */}
            <linearGradient id="0" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D2C54" />
              <stop offset="100%" stopColor="#1A3D6A" />
            </linearGradient>
            <linearGradient id="1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#005B3C" />
              <stop offset="100%" stopColor="#007A4D" />
            </linearGradient>
            <linearGradient id="2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B0A45" />
              <stop offset="100%" stopColor="#5F2A75" />
            </linearGradient>
            <linearGradient id="3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#004C56" />
              <stop offset="100%" stopColor="#006F79" />
            </linearGradient>
            <linearGradient id="4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#343A40" />
              <stop offset="100%" stopColor="#212529" />
            </linearGradient>
            <linearGradient id="5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4E89C4" />
              <stop offset="100%" stopColor="#1E3A64" />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(24, 24, 33, 0.19)' }} />
            <Legend layout='vertical' align='left' verticalAlign='middle'/>
            <Pie
              data={data}
              dataKey={"score"}
              nameKey={x => finAssetCategoryDictionary[x.category]} labelLine>
              {
                data.map((x, index) => (
                  <Cell
                    stroke='rgb(148 163 184)'
                    key={`cell-${index}`}
                    fill={`url(#${x.category.toString()})`}
                    className='focus:outline-none'
                  />
                ))
              }
            </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  return (
    active && payload && payload.length &&
    <div className='bg-slate-600 p-5 rounded-lg'>
      {
        payload.map(x => <div key={x.name} className='flex flex-col gap-2 text-sm'>
          <p className='font-bold'>{x.name}</p>
          <p>{x.value ?? 0}%
          </p>
        </div>)
      }
    </div>
  )
}