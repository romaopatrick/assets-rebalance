import React, { Suspense } from 'react'
import BackButton from '@/app/components/buttons/back-button'
import AccountForm from '../components/account-form'
import { finAssetsBankAccountService } from '@/services/fin-assets-bank-account/fin-assets-bank-account.service'

type Props = {
    params: {
        accountId: string
    }
}

export default async function EditAccount({ params: { accountId } }: Props) {
    const account = await finAssetsBankAccountService.getById(accountId)

    return (
        <div>
            <BackButton />
            <Suspense>
                <div className=''>
                    {account
                        ? <AccountForm account={account} />
                        : <span>Account not found</span>
                    }
                </div>
            </Suspense>
        </div>
    )
}
