import { FinAssetsGroup } from '@/domain/fin-assets-group'
import React from 'react'
import ResumeCard from './resume-card'
import { finAssetCategoryDictionary } from '@/domain/enums/fin-asset-category.enum'
import { finAssetsBankAccountService } from '@/services/fin-assets-bank-account/fin-assets-bank-account.service'
import GroupCardChild from './group-card-child'
import { FinAssetBankAccount } from '@/domain/fin-asset-bank-account'

type Props = {
    accounts: FinAssetBankAccount[]
    group: FinAssetsGroup
}

export default async function GroupCard({ group, accounts }: Props) {
    const findAccount = (id: string) => accounts?.find(x => x.id === id)

    return (
        <div className='flex  flex-col shadow-sm rounded-md hover:shadow-md hover:shadow-pink-800 shadow-pink-900 px-4 py-3 bg-slate-900'>
            <div className='flex items-start justify-between '>
                <span className='text-2xl text-slate-50'>{group.name}</span>
                <span className='text-xs text-slate-400'>{finAssetCategoryDictionary[group.category]}</span>
            </div>
            <div className='flex gap-2'>
                <ResumeCard amount={group.currentAmount} label='Current' className='flex-1' />
                <ResumeCard amount={group.recommendedAmount} label='Recommended' className='flex-1' />
                <ResumeCard amount={group.adjustAmount} useSign label='Adjust' className='flex-1' />
                <div className='flex flex-col flex-1 items-end'>
                    <span className='text-xs'>Score</span>
                    <div className='flex items-center'>
                        <span className='text-2xl'>{group.score}</span>
                        <span className='text-xs'>%</span>
                    </div>
                </div>
            </div>
            <span className='border-b my-4 border-b-pink-700 w-full' />
            <div className='flex gap-2 flex-wrap text-xs'>
                {
                    group.children.map(x => <GroupCardChild finAsset={x} key={x.name} account={findAccount(x.accountId)} />)
                }
            </div>
        </div>
    )
}
