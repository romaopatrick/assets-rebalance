import { categories_keys, finAssetCategoryDictionary } from '@/lib/domain/enums/fin-asset-category.enum'
import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel'
import { groupByToSet } from '@/lib/utils/array'
import { currency_f } from '@/lib/utils/numeric'
import React from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Rectangle, TooltipProps } from 'recharts'
type Props = {
    panel: FinAssetsPanel
}

export default function BarChartVestedByCategory({ panel }: Props) {
    const grouped = groupByToSet(panel.children, f => f.category)
    const data = categories_keys.map((x: any) => {
        let current, adjust, recommended, buy = 0
        let category = finAssetCategoryDictionary[x]
        const key = grouped.keys().find(y => y == x)
        if (key != undefined) {
            category += ` ${grouped.get(key)?.values().reduce((acc, b) => acc += b.score, 0)}%`
            current = grouped.get(key)?.values()?.reduce((acc, b) => acc += b.currentAmount, 0) ?? 0
            adjust = grouped.get(key)?.values()?.reduce((acc, b) => acc += b.adjustAmount, 0) ?? 0
            buy = grouped.get(key)?.values()?.reduce((acc, b) => acc += b.buyAdjustAmount, 0) ?? 0
            recommended = grouped.get(key)?.values()?.reduce((acc, b) => acc += b.currentAmount, 0) ?? 0
        }
        return ({
            category,
            current,
            adjust,
            buy,
            recommended
        })
    })

    return (
        <div className='w-[60%] h-96 rounded-xl border border-slate-400 px-5 pb-6 pt-5'>
            <span className='text-slate-400 font-bold italic'>Vested BRL x Category</span>
            <ResponsiveContainer>
                <BarChart data={data} >
                    <defs>
                        <linearGradient id="barGradientCurrent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#334155" stopOpacity={0.95} />
                            <stop offset="40%" stopColor="#1E293B" stopOpacity={0.85} />
                            <stop offset="80%" stopColor="#0F172A" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#0A0F1E" stopOpacity={0.75} />
                        </linearGradient>
                        <linearGradient id="barGradientAdjust" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(197, 206, 24, 0.7)" stopOpacity={0.95} />
                            <stop offset="40%" stopColor="rgba(132, 139, 14, 0.7)" stopOpacity={0.85} />
                            <stop offset="80%" stopColor="#334155" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#1E293B" stopOpacity={0.75} />
                        </linearGradient>
                        <linearGradient id="barGradientBuy" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(10, 152, 57, 0.7)" stopOpacity={0.95} />
                            <stop offset="40%" stopColor="rgba(6, 169, 87, 0.7)" stopOpacity={0.85} />
                            <stop offset="80%" stopColor="rgba(10, 234, 86, 0.7)" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="rgba(0, 255, 129, 0.7)" stopOpacity={0.75} />
                        </linearGradient>
                        <linearGradient id="barGradientRecommended" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(17, 13, 156, 0.7)" stopOpacity={0.95} />
                            <stop offset="40%" stopColor="rgba(86, 81, 222, 0.63)" stopOpacity={0.85} />
                            <stop offset="80%" stopColor="#0F172A" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#0A0F1E" stopOpacity={0.75} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="category" name='Category' tick={{ fill: '#94A3B8', fontSize: 12 }} /> {/* Slate-400 for subtle contrast */}
                    <YAxis
                        allowDecimals
                        tickSize={10}
                        tick={{ fill: '#94A3B8', fontSize: 10 }}
                        tickFormatter={(v) => currency_f(v, 'pt-BR', 'BRL', false)}
                    />
                    <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(24, 24, 33, 0.19)' }} />
                    <Legend
                        verticalAlign="top"
                        payload={[
                            { dataKey: 'current', color: 'url(#barGradientCurrent)', value: 'Current' },
                            { dataKey: 'adjust', color: 'url(#barGradientAdjust)', value: 'Adjust' },
                            { dataKey: 'buy', color: 'url(#barGradientBuy)', value: 'Buy' },
                            { dataKey: 'recommended', color: 'url(#barGradientRecommended)', value: 'Recommended' },
                        ]}
                    />
                    <Bar
                        fill="url(#barGradientCurrent)"
                        fillOpacity="95%"
                        stackId={"current_buy"}
                        radius={[3, 3, 0, 0]}
                        dataKey="current"
                        name={"Current"}
                        animationDuration={1000}
                        activeBar={
                            <Rectangle
                                stroke="rgba(148, 163, 184, 0.5)"  // Soft Slate-400 outline

                            />
                        }
                    />
                    <Bar
                        fill="url(#barGradientBuy)"
                        fillOpacity="95%"
                        stackId={"current_buy"}
                        radius={[3, 3, 0, 0]}
                        dataKey="buy"
                        name={"Buy"}
                        animationDuration={1000}
                        activeBar={
                            <Rectangle
                                stroke="rgba(148, 163, 184, 0.5)"  // Soft Slate-400 outline
                            />
                        }
                    />
                    <Bar
                        fill="url(#barGradientAdjust)"
                        fillOpacity="95%"
                        radius={[3, 3, 0, 0]}
                        dataKey="adjust"
                        name={"Adjust"}
                        animationDuration={1000}
                        activeBar={
                            <Rectangle
                                stroke="rgba(148, 163, 184, 0.5)"  // Soft Slate-400 outline
                            />
                        }
                    />
                    <Bar
                        fill="url(#barGradientRecommended)"
                        fillOpacity="95%"
                        radius={[3, 3, 0, 0]}
                        dataKey="recommended"
                        name={"Recommended"}
                        animationDuration={1000}
                        activeBar={
                            <Rectangle
                                stroke="rgba(148, 163, 184, 0.5)"  // Soft Slate-400 outline
                            />
                        }
                    />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}
const BarTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    return (
        active && payload && payload.length &&
        <div className='bg-slate-600 p-5 rounded-lg'>
            <p className="text-slate-200 font-bold">{`${label}`}</p>
            {
                payload.map(x => <div key={x.name} className='flex gap-2 text-sm'>
                    <p className='font-bold'>{x.name}</p>
                    <p>{currency_f(x.value ?? 0)}</p>
                </div>)
            }

        </div>

    )
}