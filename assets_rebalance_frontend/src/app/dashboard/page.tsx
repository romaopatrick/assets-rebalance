'use client'

import React, { Suspense, useEffect, useState } from 'react'
import * as finAssetsPanelService from '@/app/panels/actions'
import ResumeCard from './components/resume-card'
import { FinAssetsPanel } from '@/lib/domain/fin-assets-panel'
import { toast } from 'react-toastify'

export default function Dashboard() {
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
            const panels = await finAssetsPanelService.getAllPanels()
            setPanels(panels)
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    useEffect(() => { fetchDashboard() }, [])

    return (
        <div className='flex flex-col py-12 gap-12 pl-12'>
            <span className='text-5xl'>Dashboard</span>
            <Suspense fallback={'Loading...'}>
                <div className='flex gap-4 flex-wrap px-12'>
                    <ResumeCard amount={totalAmount} label='Total' />
                    <ResumeCard amount={invested} label='Invested' />
                    <ResumeCard amount={available} label='Available' />
                </div>
            </Suspense>
        </div>
    )
}
