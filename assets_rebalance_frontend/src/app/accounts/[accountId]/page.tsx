import React, { Suspense } from 'react'
import BackButton from '@/app/components/buttons/back-button'
import AccountForm from '../components/account-form'
import * as finAssetsBankAccountService  from '@/lib/api/fin-assets-bank-account/fin-assets-bank-account-actions'

type Props = {
    params: {
        accountId: string
    }
}

export default async function EditAccount({ params: { accountId } }: Props) {
    const account = await finAssetsBankAccountService.getBankAccountById(accountId)

    return (
        <div>
            <BackButton />
            <Suspense fallback={"Loading..."}>
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
