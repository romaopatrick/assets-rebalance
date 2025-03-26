import { FinAssetCategory } from '@/lib/domain/enums/fin-asset-category.enum'
import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel'
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import moment from 'moment'
import { groupByToSet } from '@/lib/utils/array'
import { currency_f } from '@/lib/utils/numeric'
import Select from 'react-select'
import { FinAsset } from '@/lib/domain/fin-asset'
import { Checkbox } from 'rsuite'
type Props = {
  panel: FinAssetsPanel
  year?: string
  onYearSelect?: (year?: string) => void
  showTotal?: boolean
  setShowTotal?: (v: boolean) => void
}
export default function LineChartNextExpirations({ panel, year, onYearSelect, showTotal, setShowTotal }: Props) {
  const shouldFilterYear = !!year
  const dateFormat = shouldFilterYear ? "MM/YYYY" : "YYYY"

  const spreadData = panel.children
    .map(x => x.children
      .filter(y =>
        y.category === FinAssetCategory.Fixed &&
        y.fixedIncomeData?.expirationDate)
      .map(y => {
        const expirationDate = moment(y.fixedIncomeData?.expirationDate)
        return {
          expirationDate,
          currentAmount: y.currentAmount,
          asset: y
        }
      })).flat()
    .sort((a, b) => a?.expirationDate.diff(b?.expirationDate) ?? -1)

  const groupByYear = groupByToSet(spreadData, x => x?.expirationDate.format("YYYY"))
  const groupByDinamic = groupByToSet(spreadData.filter(x => !shouldFilterYear || x?.expirationDate.year().toString() == year), x => x?.expirationDate.format(dateFormat))

  const data = groupByDinamic.entries().map(([k, v]) => ({
    expirationDate: k,
    current: v.values().reduce((acc, b) => acc += b?.currentAmount ?? 0, 0),
    cdi: v.values().filter(x => x.asset.tag === 'CDI').reduce((acc, b) => b.currentAmount ?? 0, 0),
    ipca: v.values().filter(x => x.asset.tag === 'IPCA').reduce((acc, b) => b.currentAmount ?? 0, 0),
    fix: v.values().filter(x => x.asset.tag === 'FIX').reduce((acc, b) => b.currentAmount ?? 0, 0),
    t_cdi: v.values().filter(x => x.asset.tag === 'T_CDI').reduce((acc, b) => b.currentAmount ?? 0, 0),
    t_fix: v.values().filter(x => x.asset.tag === 'T_FIX').reduce((acc, b) => b.currentAmount ?? 0, 0),
    t_ipca: v.values().filter(x => x.asset.tag === 'T_IPCA').reduce((acc, b) => b.currentAmount ?? 0, 0),
    assets: v.values().map(x => x?.asset).toArray()
  })).toArray()

  const yearOpts = groupByYear?.keys()?.map(x => ({
    value: x,
    label: x
  })).toArray() ?? []

  console.log(data)

  return (
    <div className='w-[60%] h-[30vh] min-h-fit  border-slate-100 border rounded-xl p-5'>
      <div className='flex justify-between'>
        <span className='text-slate-400 font-bold italic'>Fixed Assets Expiration Calendar</span>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <Checkbox
              checked={showTotal}
              onCheckboxClick={() => setShowTotal?.(!showTotal)}
            />
            <label>Show Total</label>
          </div>
          <Select
            value={{
              value: year?.toString(),
              label: year?.toString()
            }}
            unstyled
            classNames={{
              control: _ => `max-h-2`,
              container: () => `!text-slate-100 !bg-slate-600  outline-none`,
              group: () => `!text-slate-100 !bg-slate-600  `,
              valueContainer: () => ` !text-slate-100 !bg-slate-600  !outline-none !border-none px-2`,
              menu: () => `max-h-2 !text-slate-100 !bg-slate-600  !outline-none !border-none cursor-pointer`,
              menuList: () => ` !text-slate-100 !bg-slate-600  !outline-none !border-none`,
              singleValue: () => `!text-slate-100 !bg-slate-600  !outline-none !border-none`,
              input: () => `!text-slate-100 !cursor-text `,
              option: () => `!cursor-pointer p-2 font-arial hover:!bg-slate-900 data-[selected=true]:bg-green-400`,
              clearIndicator: () => `!text-xs`
            }}
            escapeClearsValue
            isClearable
            placeholder={'Select an year to view months'}
            onChange={
              (e) => onYearSelect?.(e?.value)
            } className='w-36 rounded-md'
            options={yearOpts} />
        </div>
      </div>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={"expirationDate"} name='Expiration Date' />
          <YAxis />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(24, 24, 33, 0.19)' }} />
          <Legend verticalAlign='top' margin={{
            bottom: 100
          }} />
          {showTotal && <Line type="monotone" name='Total Sum' dataKey="current" stroke="#8884d8" />}
          <Line type="monotone" name='CDI Sum' dataKey="cdi" stroke="#4E89C4" />  
          <Line type="monotone" name='IPCA Sum' dataKey="ipca" stroke="#9A60B4" /> 
          <Line type="monotone" name='FIX Sum' dataKey="fix" stroke="#5DAE8B" />   
          <Line type="monotone" name='T_FIX Sum' dataKey="t_fix" stroke="#D97925" />
          <Line type="monotone" name='T_IPCA Sum' dataKey="t_ipca" stroke="#C1A92D" />
          <Line type="monotone" name='T_CDI Sum' dataKey="t_cdi" stroke="#67738C" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  return (
    active && payload && payload.length &&
    <div className='bg-slate-600 p-2 rounded-lg gap-y-4 flex flex-col'>
      <p className='text-lg font-bold'>{label}</p>
      {
        payload.map(x => <div key={x.name} className='flex flex-col  gap-x-2 text-sm'>
          <span><span className='font-bold'>{x.name}:</span> {currency_f(x.value ?? 0)}</span>
          {x.payload["assets"]
            .filter((a: FinAsset) => x.dataKey === a.tag?.toLowerCase())
            .map((asset: FinAsset) => asset &&
              <div>
                <span className='text-xs font-bold'>{asset.name}: </span>
                <span className='text-xs italic'>{currency_f(asset.currentAmount)} - {moment(asset.fixedIncomeData?.expirationDate).format("DD/MM/YYYY")}</span>
              </div>)
          }
        </div>)
      }
    </div>
  )
}