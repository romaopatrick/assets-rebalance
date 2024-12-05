'use client'

import * as finAssetsBankService from '@/lib/api/fin-assets-bank/fin-assets-bank-actions'
import React, { useEffect, useState } from 'react'
import { FinAssetBank } from '@/lib/domain/fin-asset-bank'
import { useLoad } from '@/app/components/hooks/use-load'
import Select from 'react-select'
type Props = {
    bank?: FinAssetBank
    onSelect?: (v: FinAssetBank) => void
}

function getBankViewName(b: FinAssetBank) {
    return b && `${b?.routing} - ${b?.name}`
}

export default function BanksSelect({ onSelect, bank }: Props) {
    const [banks, setBanks] = useState<FinAssetBank[]>([])
    
    const options = banks?.map(x => {
        return ({
            id: x.id ?? '',
            value: x.id ?? '',
            label: getBankViewName(x) ?? ''
        })
    }) ?? []

    const selectedOpt = options.find(x => x.id == bank?.id)

    const load = useLoad()

    async function fetchBanks() {
        await load.execute(async () => {
            const fetchedBanks = await finAssetsBankService.getAllBanks(true)
            setBanks(fetchedBanks)
            if (fetchedBanks.length && !bank) 
                onSelect?.(fetchedBanks[0])
        })
    }

    useEffect(() => {
        fetchBanks()
    }, [])


    function handleSelect(value: string) {
        const b = banks.find((b) => b.id === value)
        if (b) {
            onSelect?.(b)
        }
    }

    return (
        <Select
            value={selectedOpt!}
            classNames={{
                control: (c) => `${c} py-1 !cursor-pointer`,
                input: (c) => `${c} !cursor-text`,
                option: (c) => `${c} !cursor-pointer font-arial`,
            }}
            placeholder={''}
            onChange={
                (e) => e?.value && handleSelect(e.value)
            } className='text-slate-800 w-64 rounded-sm'
            options={options} />
    )
}
