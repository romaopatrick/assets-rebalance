'use client'

import { FinAsset } from '@/lib/domain/fin-asset'
import React, { useState } from 'react'

import * as Collapsible from '@radix-ui/react-collapsible'
import { MdArrowRight } from 'react-icons/md'
import FinAssetItem from './fin-asset-item'
import { replaceAtIndex } from '@/lib/utils/array'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'


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
        let r = replaceAtIndex(assets, i, a).map(x => {
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
                <div className='flex w-full justify-between'>
                    <span>{firstAsset?.tag}</span>
                    <span>{firstAsset?.score}%</span>
                </div>

                <span className={`${expanded ? 'rotate-90' : 'rotate-0'} 
                                    transition-all duration-300 text-2xl`}>
                    <MdArrowRight />
                </span>
            </Collapsible.Trigger>
            <Collapsible.Content className='border-b border-x rounded-b-md border-green-800'>
                {
                    assets.map((x, i) => <FinAssetItem accounts={accounts} asset={x} onChange={a => handleChange(i, x)} />)
                }
            </Collapsible.Content>
        </Collapsible.Root>
    )
}
