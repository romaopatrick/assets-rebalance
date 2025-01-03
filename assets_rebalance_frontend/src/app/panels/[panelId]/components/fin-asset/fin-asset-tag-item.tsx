'use client'

import { FinAsset } from '@/lib/domain/fin-asset'
import React, { useState } from 'react'

import * as Collapsible from '@radix-ui/react-collapsible'
import { MdArrowRight } from 'react-icons/md'
import FinAssetItem from './fin-asset-item'
import { replaceAtIndex } from '@/lib/utils/array'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import { currency_f } from '@/lib/utils/numeric'


type Props = {
    assets: FinAsset[]
    accounts: FinAssetBankAccount[]
    onChange?: (a: FinAsset[]) => void
}

export default function FinAssetTagItem({ assets, onChange, accounts }: Props) {
    const firstAsset = assets[0]
    const [expanded, setExpanded] = useState(false)

    const toggle = () => {
        setExpanded(prev => !prev)
    }

    const handleChange = (i: number, a: FinAsset) => {
        const r = replaceAtIndex(assets, i, a).map(x => {
            x.score = a.score
            return x
        })

        onChange?.(r)
    }
    return (
        <Collapsible.Root className='flex w-full flex-col'>
            <Collapsible.Trigger value={Number(expanded)} onClick={toggle}
                className={`flex w-full px-4 py-3 justify-between items-center cursor-pointer bg-slate-900 hover:bg-green-800 hover:text-white 
                 transition-all duration-300 outline-none ${expanded ? '!bg-green-800 hover:!bg-green-800 rounded-t-md rounded-b-none' : 'rounded-md '}`}>
                <div className='flex w-full'>
                    <div className='flex flex-1'>
                        <span>{firstAsset?.tag}</span>
                    </div>
                    <div className='flex items-start gap-2 flex-col flex-1'>
                        <label className='text-xs'>Current</label>
                        <span>{currency_f(assets.map(x => x.currentAmount).reduce((a, acc) => acc + a, 0) ?? 0)}</span>
                    </div>

                    <div className='flex items-start gap-2 flex-col flex-1'>
                        <label className='text-xs'>Recommended</label>
                        <span>{currency_f(assets.map(x => x.recommendedAmount ?? 0).reduce((a, acc) => acc + a, 0) ?? 0)}</span>
                    </div>

                    <div className='flex items-start gap-2 flex-col flex-1'>
                        <label className='text-xs'>Adjust</label>
                        <span>{currency_f(assets.map(x => x.adjustAmount ?? 0).reduce((a, acc) => acc + a, 0) ?? 0)}</span>
                    </div>

                    <div className='flex items-start gap-2 flex-col flex-1'>
                        <label className='text-xs'>Buy Adjust</label>
                        <span>{currency_f(assets.map(x => x.buyAdjustAmount ?? 0).reduce((a, acc) => acc + a, 0) ?? 0)}</span>
                    </div>
                    <span>{firstAsset?.score}%</span>
                </div>

                <span className={`${expanded ? 'rotate-90' : 'rotate-0'} 
                                    transition-all duration-300 text-2xl`}>
                    <MdArrowRight />
                </span>
            </Collapsible.Trigger>
            <Collapsible.Content className='border-b border-x rounded-b-md border-green-800 overflow-hidden'>
                {
                    assets.map((x, i) => <FinAssetItem accounts={accounts} asset={x} onChange={a => handleChange(i, x)} />)
                }
            </Collapsible.Content>
        </Collapsible.Root >
    )
}
