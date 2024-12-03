'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useQueryParam, withDefault, BooleanParam } from 'use-query-params'
import { useLoad } from '../components/hooks/use-load'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import AccountItem from './components/account-item'
import RedirectPlusButton from '../components/buttons/redirect-plus-button'
import { finAssetsBankAccountService } from '@/lib/services/fin-assets-bank-account/fin-assets-bank-account.service'
import OnlyActiveSwitch from '../components/inputs/only-active-switch'

type Props = {
    searchParams: {
        oa: boolean
    }
}

export default async function Accounts({
    searchParams: {
        oa = true,
    }
}: Props) {
    const accounts = await fetchAccounts()
    async function fetchAccounts() {
        const accs = await finAssetsBankAccountService.all(oa)
        return accs
    }

    return (
        <Suspense>
            <RedirectPlusButton href='/accounts/new' />
            <div className='flex justify-end w-full pt-3 pr-3'>
                <OnlyActiveSwitch />
            </div>
            <div className='pl-12'>
                <h1 className='text-5xl self-start text-slate-50'>Accounts</h1>
                <Suspense>
                    <div className='flex flex-wrap gap-4 p-12'>
                        {
                            accounts.map(x => <AccountItem key={x.id} refresh={fetchAccounts} account={x} />)
                        }
                    </div>
                </Suspense>
            </div>
        </Suspense>
    )
}
