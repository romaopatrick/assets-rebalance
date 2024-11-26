import { FinAsset } from '@/domain/fin-asset'
import { FinAssetBankAccount } from '@/domain/fin-asset-bank-account'
import React from 'react'
type Props = {
    finAsset: FinAsset
    account?: FinAssetBankAccount
}
export default function GroupCardChild({ finAsset, account }: Props) {
    return (
        <div className='flex gap-2 items-center' key={finAsset.name}>
            { account?.bank?.iconBase64 && <img className='rounded-full' width={20} src={account?.bank?.iconBase64}/> } 
            <span>
                {account?.name} | {finAsset.name}
            </span>
        </div>
    )
}
