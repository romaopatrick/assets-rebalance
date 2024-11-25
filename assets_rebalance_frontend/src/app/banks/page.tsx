'use client'

import React, { useEffect, useState } from 'react'
import RedirectPlusButton from '../components/buttons/redirect-plus-button'
import OnlyActiveSwitch from '../components/inputs/only-active-switch'
import { finAssetsBankService } from '@/services/fin-assets-bank/fin-assets-bank.service'
import BankItem from './components/bank-item'
import { FinAssetBank } from '@/domain/fin-asset-bank'
import { useLoad } from '../components/hooks/use-load'
import { BooleanParam, useQueryParam, withDefault } from 'use-query-params'

type Props = {
}

export default function Banks(props: Props) {
    const [banks, setBanks] = useState<FinAssetBank[]>([])
    const [onlyActive, setOnlyActive] = useQueryParam('oa', withDefault(BooleanParam, true))

    const load = useLoad()


    async function fetchBanks() {
        await load.execute(async () => {
            const b = await finAssetsBankService.all(onlyActive)
            setBanks(b)
        })
    }

    useEffect(() => {
        fetchBanks()
    }, [onlyActive])

    const handleOnlyActiveSwitchChange = (v: boolean) => {
        setOnlyActive(v, 'replaceIn')
    }

    return (
        <>
            <RedirectPlusButton href='/banks/new' />
            <div className='flex justify-end w-full pt-3 pr-3'>
                <OnlyActiveSwitch onChange={handleOnlyActiveSwitchChange} checked={onlyActive} />
            </div>
            <div className='flex pl-12 flex-col items-center'>
                <h1 className='text-5xl self-start text-slate-50'>Banks</h1>
                <div className='flex flex-wrap gap-4 p-12'>
                    {banks?.length > 0
                        ? banks?.sort((a, b) => a.createdAt! < b.createdAt! ? 1 : -1)
                            .sort((a, b) => b.enabled ? 0 : -1)
                            .map(x => <BankItem canArchive refresh={() => fetchBanks()} key={x.id} bank={x} />)
                        : <span>No data to fetch</span>
                    }
                </div>
            </div>
        </>
    )
}


