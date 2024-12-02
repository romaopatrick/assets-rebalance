import { FinAssetCategory, finAssetCategoryDictionary, isTaggedCategory } from '@/lib/domain/enums/fin-asset-category.enum'
import { FinAssetsGroup } from '@/lib/domain/fin-assets-group'
import { currency_f } from '@/lib/utils/numeric'
import React from 'react'
import FinAssetItem from '../fin-asset/fin-asset-item'
import { FinAsset } from '@/lib/domain/fin-asset'
import { groupByToSet, replaceAtIndex } from '@/lib/utils/array'
import FinAssetTagItem from '../fin-asset/fin-asset-tag-item'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import NewFinAssetModal from '../fin-asset/new-fin-asset-modal'

import {uuid as v4} from 'uuidv4'

type Props = {
    group: FinAssetsGroup
    onChange?: (g: FinAssetsGroup) => void
    accounts: FinAssetBankAccount[]
}
export default function GroupItem({ group, onChange, accounts }: Props) {
    const useTag = isTaggedCategory(group.category)
    const groupSet = groupByToSet(group.children, x => x.tag)
    const keys = groupSet.keys()


    const assetsScore = useTag 
    ? groupSet?.values()?.map((x) => {
        return Array.from(x)?.[0]?.score ?? 0
    })?.reduce((a, acc) => acc + a, 0)
    : group?.children?.map(x => x.score)?.reduce((a, acc) => acc + a, 0)

    const validScore = assetsScore == 100

    const handleAssetChange = (idx: number, fa: FinAsset) => {
        group.children = replaceAtIndex(group.children, idx, fa)
        onChange?.({ ...group })
    }

    const handleTagChange = (tag: string, assets: FinAsset[]) => {
        group.children = group.children.map(c => {
            const changed = assets.find(x => x.name === c.name && c.tag === tag)

            return changed || c
        })

        onChange?.({ ...group })
    }

    const handleAddAsset = (asset: FinAsset) => {
        group.children.push(asset)

        onChange?.({ ...group })
    }

    return (
        <>
            <div className='flex gap-4'>
                <NewFinAssetModal group={group} onAdd={handleAddAsset} />
                <div className='border w-fit border-green-800 p-2 px-4 rounded-md'>
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
            <div className='flex w-full h-full flex-col gap-4'>
                {
                    useTag
                        ? keys?.toArray().map(x => <FinAssetTagItem accounts={accounts} key={x} assets={Array.from(groupSet.get(x)!)} onChange={(assets) => {
                            x && handleTagChange(x, assets)
                        }} />)
                        : group.children.map((x, i) => <FinAssetItem accounts={accounts} key={x.tag} asset={x} onChange={(fa) => handleAssetChange(i, fa)} />)
                }
            </div>
        </>
    )
}
