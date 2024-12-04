import { FinAssetsGroup } from '@/lib/domain/fin-assets-group'
import React from 'react'
import ResumeCard from './resume-card'
import { finAssetCategoryDictionary } from '@/lib/domain/enums/fin-asset-category.enum'
import GroupCardChild from './group-card-child'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'

type Props = {
    accounts: FinAssetBankAccount[]
    group: FinAssetsGroup
}

export default async function GroupCard({ group, accounts }: Props) {
    const findAccount = (id: string) => accounts?.find(x => x.id === id)

    return (
        <div className='flex w-[700px] transition-all duration-300 flex-col shadow-sm rounded-md hover:shadow-md hover:shadow-green-800 shadow-green-800 px-4 py-3 bg-slate-900'>
            <div className='flex items-start justify-between '>
                <span className='text-2xl text-slate-50'>{group.name}</span>
                <span className='text-xs text-slate-400'>{finAssetCategoryDictionary[group.category]}</span>
            </div>
            <div className='flex w-fit gap-2'>
                <ResumeCard amount={group.currentAmount} label='Current' className='!w-[200px]' />
                <ResumeCard amount={group.recommendedAmount} label='Recommended' className='!w-[200px]' />
                <ResumeCard amount={group.adjustAmount} label='Adjust' className='!w-[200px]' />
                <div className='flex flex-col '>
                    <span className='text-xs'>Score</span>
                    <div className='flex items-center'>
                        <span className='text-2xl'>{group.score}</span>
                        <span className='text-xs'>%</span>
                    </div>
                </div>
            </div>
            <span className='border-b my-4 border-b-green-800 w-full' />
            <div className='flex gap-2 flex-wrap text-xs'>
                {
                    group.children.map(x => <GroupCardChild finAsset={x} key={x.name} account={findAccount(x.accountId)} />)
                }
            </div>
        </div>
    )
}
