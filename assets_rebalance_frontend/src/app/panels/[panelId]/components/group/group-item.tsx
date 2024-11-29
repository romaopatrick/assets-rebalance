import { FinAssetCategory, finAssetCategoryDictionary, isTaggedCategory } from '@/domain/enums/fin-asset-category.enum'
import { FinAssetsGroup } from '@/domain/fin-assets-group'
import { currency_f } from '@/utils/numeric'
import React from 'react'
import FinAssetItem from '../fin-asset/fin-asset-item'
import { FinAsset } from '@/domain/fin-asset'
import { groupByToSet, replaceAtIndex } from '@/utils/array'
import FinAssetTagItem from '../fin-asset/fin-asset-tag-item'
type Props = {
    group: FinAssetsGroup
    onChange?: (g: FinAssetsGroup) => void
}
export default function GroupItem({ group, onChange }: Props) {
    const groupSet = groupByToSet(group.children, x => x.tag)
    const assetsScore = groupSet.values().map((x) => {
        return Array.from(x)?.[0]?.score ?? 0
    }).reduce((a, acc) => acc + a)
    
    

    const validScore = assetsScore == 100
    
    console.log(isTaggedCategory(group.category))

    const handleAssetChange = (idx: number, fa: FinAsset) => {
        group.children = replaceAtIndex(group.children, idx, fa)
        onChange?.({ ...group })
    }

    return (
        <>
            <div className='flex gap-4'>
                <button formAction={() => { }} onClick={() => { }}
                    className='w-12 h-12 hover:bg-pink-700 bg-pink-800 rounded-md
                        transition-all duration-300'>+</button>
                <div className='border w-fit border-pink-900 p-2 px-4 rounded-md'>
                    <div className='flex gap-12'>
                        <div className='flex flex-col'>
                            <span>Current</span>
                            <span className='text-xl'>{currency_f(group.currentAmount)}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>Recommended</span>
                            <span className='text-xl'>{currency_f(group.recommendedAmount)}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>Adjust</span>
                            <span className='text-xl'>{currency_f(group.adjustAmount)}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span>Assets Score</span>
                            <span className={`text-xl ${validScore ? 'text-green-500' : 'text-red-400'}`} >{assetsScore}</span>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className='flex flex-col gap-2'>
                {
                    isTaggedCategory(group.category)
                        ? groupSet.keys().map((k) => <FinAssetTagItem assets={Array.from(groupSet.get(k)!)} key={k} />)
                        : group.children.map((x, i) => <FinAssetItem key={x.tag} asset={x} onChange={(fa) => handleAssetChange(i, fa)} />)
                }
            </div>
        </>
    )
}
