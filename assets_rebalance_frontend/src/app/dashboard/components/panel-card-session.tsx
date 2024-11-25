import { FinAssetsPanel } from '@/domain/fin-assets-panel'
import React from 'react'
import ResumeCard from './resume-card'
type Props = {
    panel: FinAssetsPanel
}
export default function PanelCardSession({ panel }: Props) {
    return (
        <div className='flex flex-col'>
            <div className='pl-6'>
                <h3 className='text-2xl '>{panel.name}</h3>
                <div className='w-full mt-1 mb-5 border-b-2 border-b-pink-900' />
            </div>
            <div className='flex gap-4 flex-wrap px-12'>
                <ResumeCard amount={panel.totalAmount} label='Total' />
                <ResumeCard amount={panel.investedAmount} label='Invested' />
                <ResumeCard amount={panel.amountToInvest} label='Available' />
                <ResumeCard amount={panel.totalAmount - (panel.investedAmount + panel.amountToInvest)} label='Calc Mistake' />
            </div>
        </div>
    )
}
