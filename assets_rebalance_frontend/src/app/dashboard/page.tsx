import { finAssetsPanelManager } from '@/domain/fin-assets-panel'
import { finAssetsPanelService } from '@/services/fin-assets-panel/fin-assets-panel.service'
import React from 'react'
import ResumeCard from './components/resume-card'
import PanelCardSession from './components/panel-card-session'
import { finAssetsBankAccountService } from '@/services/fin-assets-bank-account/fin-assets-bank-account.service'

export default async function Dashboard() {
    const accounts = await finAssetsBankAccountService.all()
    const panels = await finAssetsPanelService.all()
    const invested = panels?.length
        ? panels?.map((itm) => itm.investedAmount)
            .reduce((prev, acc) => acc += prev)
        : 0

    const total = panels?.length
        ? panels?.map((itm) => itm.totalAmount).reduce((prev, acc) => acc += prev)
        : 0

    const available = panels?.length
        ? panels?.map((itm) => itm.amountToInvest).reduce((prev, acc) => acc += prev)
        : 0

    const totalAmount = invested + available

    return (
        <div className='flex flex-col pt-12 gap-12 pl-12'>
            <span className='text-5xl'>Dashboard</span>
            <div className='flex gap-4 flex-wrap px-12'>
                <ResumeCard amount={totalAmount} label='Total' />
                <ResumeCard amount={invested} label='Invested' />
                <ResumeCard amount={available} label='Available' />
            </div>
            {
                panels?.map(x => <PanelCardSession accounts={accounts} key={x.id} panel={x} />)
            }
        </div>
    )
}
