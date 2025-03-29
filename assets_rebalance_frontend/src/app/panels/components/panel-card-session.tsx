'use client'

import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel'
import React, { useState } from 'react'
import ResumeCard from '../../dashboard/components/resume-card'
import GroupCard from '../../dashboard/components/group-card'
import Link from 'next/link'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import ChartsSession from '../../banks/components/charts/charts-session'
type Props = {
    panel: FinAssetsPanel
    accounts: FinAssetBankAccount[]
}
export default function PanelCardSession({ panel, accounts }: Props) {
    const [collapseds, setCollapseds] = useState(panel?.children?.map(x => x.id) ?? [])
    const toggle = (id: string) => {
        setCollapseds(prev => prev.includes(id) ? [...prev.filter(c => c !== id)] : [...prev, id])
    }

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
