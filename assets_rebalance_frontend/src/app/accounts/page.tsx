'use client'

import { FinAssetBank } from '@/domain/fin-asset-bank'
import React, { useEffect, useState } from 'react'
import { useQueryParam, withDefault, BooleanParam } from 'use-query-params'
import { useLoad } from '../components/hooks/use-load'
import { FinAssetBankAccount } from '@/domain/fin-asset-bank-account'
import AccountItem from './components/account-item'
import RedirectPlusButton from '../components/buttons/redirect-plus-button'
import { finAssetsBankAccountService } from '@/services/fin-assets-bank-account/fin-assets-bank-account.service'
import OnlyActiveSwitch from '../components/inputs/only-active-switch'

export default function Accounts() {
    const [accounts, setAccounts] = useState<FinAssetBankAccount[]>([])
    const [onlyActive, setOnlyActive] = useQueryParam('oa', withDefault(BooleanParam, true))

    const load = useLoad()


    async function fetchAccounts() {
        await load.execute(async () => {
            const accs = await finAssetsBankAccountService.all(onlyActive)
            setAccounts(accs)
        })
    }

    useEffect(() => {
        fetchAccounts()
    }, [onlyActive])

    const handleOnlyActiveSwitchChange = (v: boolean) => {
        setOnlyActive(v, 'replaceIn')
    }

    return (
        <>
            <RedirectPlusButton href='/accounts/new' />
            <div className='flex justify-end w-full pt-3 pr-3'>
                <OnlyActiveSwitch onChange={handleOnlyActiveSwitchChange} checked={onlyActive} />
            </div>
            <div className='pl-12'>
                <h1 className='text-5xl self-start text-slate-50'>Accounts</h1>
                <div className='flex flex-wrap gap-4 p-12'>
                    {
                        accounts.map(x => <AccountItem key={x.id} refresh={fetchAccounts} account={x} />)
                    }
                </div>
            </div>
        </>
    )
}
