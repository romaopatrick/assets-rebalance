import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel'
import React from 'react'
import ResumeCard from './resume-card'
import GroupCard from './group-card'
import Link from 'next/link'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
type Props = {
    panel: FinAssetsPanel
    accounts: FinAssetBankAccount[]
}
export default function PanelCardSession({ panel, accounts }: Props) {

    return (
        <section className='flex gap-8 pl-6 flex-col'>
            <Link href={`/panels/${panel?.id}`} className='hover:shadow transition-all rounded-sm duration-100 hover:shadow-green-800'>
                <h3 className='text-2xl transition-all duration-100'>{panel.name}</h3>
                <span className='w-full border-b-2 border-b-green-800' />
            </Link>
            <div className='flex gap-4 flex-wrap px-12'>
                <div className='flex gap-4 flex-wrap'>
                    <ResumeCard amount={panel.totalAmount} label='Total' />
                    <ResumeCard amount={panel.investedAmount} label='Invested' />
                    <ResumeCard amount={panel.amountToInvest} label='Available' />
                </div>
                <div className='flex gap-4'>
                    {
                        panel
                            .children
                            .map(c => <GroupCard group={c} key={c.name} accounts={accounts} />)
                    }
                </div>
            </div>
        </section>
    )
}
