'use client'

import { finAssetsBankService } from '@/lib/services/fin-assets-bank/fin-assets-bank.service'
import React, { useEffect, useState } from 'react'
import { useLoad } from '@/app/components/hooks/use-load'
import Select from 'react-select'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import { finAssetsBankAccountService } from '@/lib/services/fin-assets-bank-account/fin-assets-bank-account.service'
type Props = {
    preLoadAccounts?: FinAssetBankAccount[]
    account?: FinAssetBankAccount
    onSelect?: (v: FinAssetBankAccount) => void
}

function getAccountViewName(b: FinAssetBankAccount) {
    return b && `${b?.bank?.name} - ${b?.name}`
}

export default function AccountsSelect({ onSelect, account, preLoadAccounts }: Props) {
    const [accounts, setAccounts] = useState<FinAssetBankAccount[]>(preLoadAccounts ?? [])

    const options = accounts?.map(x => {
        return ({
            id: x.id ?? '',
            value: x.id ?? '',
            label: getAccountViewName(x) ?? ''
        })
    }) ?? []

    const selectedOpt = options.find(x => x.id == account?.id)

    const load = useLoad()

    async function fetchAccounts() {
        if (preLoadAccounts) {
            setAccounts(preLoadAccounts)
            return
        }
        
        await load.execute(async () => {
            const accs = await finAssetsBankAccountService.all(true)
            setAccounts(accs)
            if (accs.length && !account) onSelect?.(accs[0])
        })
    }

    useEffect(() => {
        fetchAccounts()
    }, [])


    function handleSelect(value: string) {
        const b = accounts.find((b) => b.id === value)
        if (b) {
            onSelect?.(b)
        }
    }

    return (
        <Select
            value={selectedOpt!}
            unstyled
            classNames={{
                control: _ => `max-h-2`,
                container: () => `!text-slate-100 !bg-slate-600  outline-none`,
                group: () => `!text-slate-100 !bg-slate-600  `,
                valueContainer: () => ` !text-slate-100 !bg-slate-600  !outline-none !border-none px-2`,
                menu: () => `max-h-2 !text-slate-100 !bg-slate-600  !outline-none !border-none cursor-pointer`,
                menuList: () => ` !text-slate-100 !bg-slate-600  !outline-none !border-none`,
                singleValue: () => `!text-slate-100 !bg-slate-600  !outline-none !border-none`,
                input: () => `!text-slate-100 !cursor-text `,
                option: () => `!cursor-pointer p-2 font-arial hover:!bg-slate-900 data-[selected=true]:bg-green-400`,
            }}
            placeholder={''}
            onChange={
                (e) => e?.value && handleSelect(e.value)
            } className='w-72 rounded-md'
            options={options} />
    )
}
