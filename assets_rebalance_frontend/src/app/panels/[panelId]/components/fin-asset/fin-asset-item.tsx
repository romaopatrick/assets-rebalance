import { FinAsset } from '@/domain/fin-asset'
import React, { useState } from 'react'
import { FaArrowRight, FaEdit } from 'react-icons/fa'
import * as Collapsible from '@radix-ui/react-collapsible'
import { MdArrowRight } from 'react-icons/md'
import FinAssetForm from './fin-asset-form'

type Props = {
    asset: FinAsset
    onChange?: (a: FinAsset) => void
}

export default function FinAssetItem({ asset, onChange }: Props) {
    const [expanded, setExpanded] = useState(false)

    const toggle = () => {
        setExpanded(prev => !prev)
    }
    return (
        <Collapsible.Root className=''>
            <Collapsible.Trigger value={expanded ? 1 : 0} onClick={toggle} 
                className={`flex w-full px-4 py-3 justify-between items-center cursor-pointer bg-slate-900 hover:bg-pink-800 hover:text-white 
                 transition-all duration-300 outline-none ${expanded ? '!bg-pink-800 hover:!bg-pink-700 rounded-t-md rounded-b-none': 'rounded-md '}`}>
                <div>
                    <span>{asset.name}</span>
                    <span>{asset.score}%</span>
                </div>

                <span className={`${expanded ? 'rotate-90' : 'rotate-0'} 
                                    transition-all duration-300 text-2xl`}>
                    <MdArrowRight />
                </span>
            </Collapsible.Trigger>
            <Collapsible.Content className='border-b border-x rounded-b-md border-pink-800'>
                <FinAssetForm asset={asset} onChange={onChange}/>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}
