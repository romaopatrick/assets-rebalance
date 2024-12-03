import { finAssetsBankService } from '@/lib/services/fin-assets-bank/fin-assets-bank.service'
import React, {  } from 'react'
import BankItem from './bank-item'
import { revalidateTag } from 'next/cache';

type Props = {
    searchParams: {
        oa: boolean
    }
}

export default async function BankItemsList({searchParams: {oa}}: Props) {
    const banks = await finAssetsBankService.all(oa)
    const handleRefresh = async () => {
        'use server'
        await revalidateTag('FinAssetsBankService.all')
    }
    return (
        <div className='flex flex-wrap gap-4 p-12'>
            {banks?.length > 0
                ? banks?.sort((a, b) => a.createdAt! < b.createdAt! ? 1 : -1)
                    .sort((a, b) => b.enabled ? 0 : -1)
                    .map(x => <BankItem canArchive refresh={handleRefresh} key={x.id} bank={x} />)
                : <span>No data to fetch</span>
            }
        </div>
    )
}
