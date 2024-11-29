import { finAssetCategoryDictionary } from '@/domain/enums/fin-asset-category.enum'
import { FinAssetsGroup } from '@/domain/fin-assets-group'
import { currency_f } from '@/utils/numeric'
import React from 'react'
import FinAssetItem from '../fin-asset/fin-asset-item'
type Props = {
    group: FinAssetsGroup
    onChange?: (g: FinAssetsGroup) => void
}
export default function GroupItem({ group }: Props) {
    return (
        <>
            <div className='flex gap-4'>
                <button formAction={() => { }} onClick={() => { }}
                    className='w-12 h-12 hover:bg-pink-700 bg-pink-800 rounded-md
                        transition-all duration-300'>+</button>
                <div className='border w-fit border-pink-900 p-2 rounded-md'>
                    <div className='flex gap-12 w-[50%]'>
                        <div className='flex flex-col'>
                            <span>Current</span>
                            <span>{currency_f(group.currentAmount)}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>Recommended</span>
                            <span>{currency_f(group.recommendedAmount)}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>Adjust</span>
                            <span>{currency_f(group.adjustAmount)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className='flex flex-col gap-2'>
                {group.children.map(x => <FinAssetItem key={x.tag} asset={x} />)}
            </div>
        </>
    )
}
