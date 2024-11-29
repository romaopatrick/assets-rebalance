'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { finAssetsBankAccountService } from '@/services/fin-assets-bank-account/fin-assets-bank-account.service'
import { finAssetsPanelService } from '@/services/fin-assets-panel/fin-assets-panel.service'
import PanelCardSession from './components/panel-card-session'
import ResumeCard from './components/resume-card'
import { FinAssetBankAccount } from '@/domain/fin-asset-bank-account'
import { FinAssetsPanel } from '@/domain/fin-assets-panel'
import { toast } from 'react-toastify'

export default function Dashboard() {
    const [accounts, setAccounts] = useState<FinAssetBankAccount[]>([])
    const [panels, setPanels] = useState<FinAssetsPanel[]>([])
    const invested = panels?.length
        ? panels?.map((itm) => itm.investedAmount)
            .reduce((prev, acc) => acc += prev)
        : 0

    const available = panels?.length
        ? panels?.map((itm) => itm.amountToInvest).reduce((prev, acc) => acc += prev)
        : 0
    const totalAmount = invested + available


    const fetchDashboard = async () => {
        try {
            const accounts = await finAssetsBankAccountService.all()
            const panels = await finAssetsPanelService.all()
            setAccounts(accounts)
            setPanels(panels)
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    useEffect(() => { fetchDashboard() }, [])

    return (
        <div className='flex flex-col pt-12 gap-12 pl-12'>
            <span className='text-5xl'>Dashboard</span>
            <Suspense>
                <div className='flex gap-4 flex-wrap px-12'>
                    <ResumeCard amount={totalAmount} label='Total' />
                    <ResumeCard amount={invested} label='Invested' />
                    <ResumeCard amount={available} label='Available' />
                </div>
                {
                    panels?.map(x => <PanelCardSession accounts={accounts} key={x.id} panel={x} />)
                }
            </Suspense>
        </div>
    )
}
