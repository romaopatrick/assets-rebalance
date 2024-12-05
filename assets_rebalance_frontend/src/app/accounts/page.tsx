import React, { Suspense } from 'react'
import AccountItem from './components/account-item'
import RedirectPlusButton from '../components/buttons/redirect-plus-button'
import * as finAssetsBankAccountService  from '@/lib/api/fin-assets-bank-account/fin-assets-bank-account-actions'
import dynamic from 'next/dynamic'
const OnlyActiveSwitch = dynamic(() => import('../components/inputs/only-active-switch'))


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
        const accs = await finAssetsBankAccountService.getAllBankAccounts(oa)
        return accs
    }
    async function fetchAccountsServer() {
        'use server'
        const accs = await finAssetsBankAccountService.getAllBankAccounts(oa)
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
                            accounts.map(x => <AccountItem key={x.id} refresh={fetchAccountsServer} account={x} />)
                        }
                    </div>
                </Suspense>
            </div>
        </Suspense>
    )
}
