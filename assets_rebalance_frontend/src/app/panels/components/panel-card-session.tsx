'use client'

import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel'
import React, { useState } from 'react'
import ResumeCard from '../../dashboard/components/resume-card'
import GroupCard from '../../dashboard/components/group-card'
import Link from 'next/link'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import ChartsSession from '../../banks/components/charts/charts-session'
import { FinAssetCategory } from '@/lib/domain/enums/fin-asset-category.enum'
import { getIndexerTotalPercentage } from '@/lib/domain/fin-asset'
type Props = {
    panel: FinAssetsPanel
    accounts: FinAssetBankAccount[]
    cdi?: number
    ipca?: number
}
export default function PanelCardSession({ panel, accounts, cdi, ipca }: Props) {
    const [collapseds, setCollapseds] = useState(panel?.children?.map(x => x.id) ?? [])
    const toggle = (id: string) => {
        setCollapseds(prev => prev.includes(id) ? [...prev.filter(c => c !== id)] : [...prev, id])
    }
    const fixedChildren = panel.children.flatMap(x => x.children).
        filter(x => x.category === FinAssetCategory.Fixed
            && x.fixedIncomeData?.indexer
            && x.fixedIncomeData.indexerPercent)
    const yearRateAverage = fixedChildren.reduce((acc, b) =>
        acc += getIndexerTotalPercentage(b.fixedIncomeData!, cdi ?? 0, ipca ?? 0) ?? 0,
        0
    ) / fixedChildren.length

    return (
        <section className='flex gap-8 pl-6 flex-col mt-4'>
            <Link href={`/panels/${panel?.id}`} className='hover:shadow transition-all rounded-sm duration-300 hover:shadow-green-800'>
                <h3 className='text-2xl px-2'>{panel.name}</h3>
                <span className='w-full border-b-2 border-b-green-800' />
            </Link>
            <div className='flex gap-4 flex-wrap px-12'>
                <div className='flex gap-4 flex-wrap'>
                    <ResumeCard amount={panel.totalAmount} label='Total' />
                    <ResumeCard amount={panel.investedAmount} label='Invested' />
                    <ResumeCard amount={panel.amountToInvest} label='Available' useSign />
                    <ResumeCard amount={yearRateAverage} label='Yearly Fixed Income Rate Avg %' showCurrency={false} />
                </div>

                <ChartsSession panel={panel} />

                <div className='flex gap-4 flex-wrap'>
                    {
                        panel
                            .children
                            .map(c => <GroupCard collapsed={collapseds.includes(c.id)} onClick={() => {
                                c.id && toggle(c.id)
                            }} group={c} key={c.id} accounts={accounts} />)
                    }
                </div>
            </div>
        </section>
    )
}
