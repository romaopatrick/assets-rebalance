import { FinAssetCategory } from '@/lib/domain/enums/fin-asset-category.enum'
import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel'
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import moment from 'moment'
import { groupByToSet } from '@/lib/utils/array'
import { currency_f } from '@/lib/utils/numeric'

type Props = {
  panel: FinAssetsPanel
}
export default function LineChartNextExpirations({ panel }: Props) {
  const group = groupByToSet(panel.children.map(x => x.children.map(y => {
    if (y.category !== FinAssetCategory.Fixed)
      return
    return {
      expirationDate: moment(y.fixedIncomeData?.expirationDate),
      currentAmount: y.currentAmount,
      name: y.name
    }
  })).flat().sort((a, b) => a?.expirationDate.diff(b?.expirationDate) ?? -1), x => x?.expirationDate.format("YYYY"))

  const data = group.entries().map(([k, v]) => ({
    expirationDate: k,
    currentAmount: v.values().reduce((acc, b) => acc += b?.currentAmount ?? 0, 0),
    assets: v.values().map(x => x?.name).toArray()
  })).toArray()

  return (
    <div className='w-[50%] h-52 border-slate-100 border rounded-xl p-5'>
      <span className='text-slate-400 font-bold italic'>Fixed Assets Expiration Calendar</span>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={"expirationDate"} name='Expiration Date' />
          <YAxis />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(24, 24, 33, 0.19)' }} />
          <Legend verticalAlign='top'/>
          <Line type="monotone" name='Amount Sum' dataKey="currentAmount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  return (
    active && payload && payload.length &&
    <div className='bg-slate-600 p-2 rounded-lg'>
      <p className='text-lg font-bold'>{label}</p>
      {
        payload.map(x => <div className='flex flex-col  gap-2 text-sm'>
          <p><span className='font-bold'>{x.name}:</span> {currency_f(x.value ?? 0)}</p>
          <div className='text-xs flex flex-col items-end'>
            {x.payload["assets"].map((x: string) => <p>{x}</p>)}
          </div>
        </div>)
      }
    </div>
  )
}