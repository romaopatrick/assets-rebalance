'use client'

import React, { useEffect, useState } from 'react'
import AddBankButton from './components/add-bank-button'
import OnlyActiveSwitch from '../components/inputs/only-active-switch'
import { finAssetsBankService } from '@/services/fin-assets-bank/fin-assets-bank-service'
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
            <AddBankButton />
            <div className='flex flex-col items-center'>
                <div className='flex justify-end w-full py-3 pr-3'>
                    <OnlyActiveSwitch onChange={handleOnlyActiveSwitchChange} checked={onlyActive} />
                </div>
                <div className='flex w-[90%] gap-4 flex-wrap'>
                    {banks
                        ? banks?.sort((a, b) => a.createdAt! < b.createdAt! ? 1 : -1 )
                            .sort((a, b) => b.enabled ? 0 : -1)
                            .map(x => <BankItem refresh={() => fetchBanks()} key={x.id} bank={x} />)
                        : <span>No data to fetch</span>
                    }
                </div>
            </div>
        </>
    )
}


