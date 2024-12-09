import React, { Suspense } from 'react'
import BankForm from '../components/bank-form'
import * as finAssetsBankService from '@/lib/api/fin-assets-bank/fin-assets-bank-actions'
import BackButton from '@/app/components/buttons/back-button'

type Props = {
    params: {
        bankId: string
    }
}

export default async function EditBank({ params: { bankId } }: Props) {
    const bank = await finAssetsBankService.getBankById(bankId)

    return (
        <div>
            <BackButton />
            <div className=''>
                <Suspense fallback={'Loading...'}>
                    {bank
                        ? <BankForm bank={bank} />
                        : <span>Bank not found</span>
                    }
                </Suspense>
            </div>
        </div>
    )
}
