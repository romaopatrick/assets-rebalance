import { FinAsset } from '@/lib/domain/fin-asset'
import React, { useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { MdArrowRight } from 'react-icons/md'
import FinAssetForm from './forms/fin-asset-form'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'

import Image from 'next/image'
import { FinAssetCategory, isTaggedCategory } from '@/lib/domain/enums/fin-asset-category.enum'
import FinAssetFixedForm from './forms/fin-asset-fixed-form'
import FinAssetFormByCategory from './forms/fin-asset-form-by-category'


type Props = {
    asset: FinAsset
    onChange?: (a: FinAsset) => void
    accounts: FinAssetBankAccount[]
}

export default function FinAssetItem({ asset, onChange, accounts }: Props) {
    const [expanded, setExpanded] = useState(false)
    const account = accounts?.find(x => asset.accountId == x.id)

    const useTag = isTaggedCategory(asset.category) 

    const toggle = () => {
        setExpanded(prev => !prev)
    }

    return (
        <Collapsible.Root className=''>
            <Collapsible.Trigger value={expanded ? 1 : 0} onClick={toggle}
                className={`flex w-full px-4 py-3 justify-between items-center cursor-pointer 
                    bg-slate-900 hover:bg-green-950 hover:text-white 
                 transition-all duration-300 outline-none
                 ${expanded
                        ? '!bg-green-950 hover:!bg-green-950 rounded-t-md rounded-b-none'
                        : !useTag && 'rounded-md '}
                        
                 ${
                    useTag && '!rounded-none'}      
                `}>
                <div className='flex gap-4 w-full'>
                    <Image width={20} height={20} className='rounded-md bg-slate-50' alt='bank' src={account?.bank?.iconBase64 ?? ''} />
                    <span>{asset.name}</span>
                    <span>{asset.score}%</span>
                </div>

                <span className={`${expanded ? 'rotate-90' : 'rotate-0'} 
                                    transition-all duration-300 text-2xl`}>
                    <MdArrowRight />
                </span>
            </Collapsible.Trigger>
            <Collapsible.Content className={`border-b border-x rounded-b-md border-green-950 ${useTag && '!rounded-none'}`}>
                <FinAssetFormByCategory account={account!} asset={asset} edit onChange={onChange} className={useTag ? 'bg-slate-950' : ''} />
            </Collapsible.Content>
        </Collapsible.Root>
    )
}
