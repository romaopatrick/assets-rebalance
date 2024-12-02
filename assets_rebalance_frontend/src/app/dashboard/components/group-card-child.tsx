import { FinAsset } from '@/lib/domain/fin-asset'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import Image from 'next/image'
import React from 'react'
type Props = {
    finAsset: FinAsset
    account?: FinAssetBankAccount
}
export default function GroupCardChild({ finAsset, account }: Props) {
    return (
        <div className='flex gap-2 items-center' key={finAsset.name}>
            { account?.bank?.iconBase64 && <Image className='rounded-full' width={20} height={20} src={account?.bank?.iconBase64} alt={'base64 icon bank'}/> } 
            <span>
                {account?.name} | {finAsset.name}
            </span>
        </div>
    )
}
