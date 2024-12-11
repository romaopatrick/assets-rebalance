import React, { Suspense } from 'react'
import RedirectPlusButton from '../components/buttons/redirect-plus-button'
import BankItemsList from './components/bank-items-list'
import dynamic from 'next/dynamic'

const OnlyActiveSwitch = dynamic(() => import('../components/inputs/only-active-switch'))

type Props = {
    searchParams: any
}


export default function Banks({ searchParams }: Props) {

    return (
        <>
            <RedirectPlusButton href='/banks/new' />
            <div className='flex justify-end w-full pt-3 pr-3'>
                <OnlyActiveSwitch />
            </div>
            <div className='flex pl-12 flex-col items-center'>
                <h1 className='text-5xl self-start text-slate-50'>Banks</h1>
                <Suspense fallback={'Loading...'}>
                    <BankItemsList searchParams={searchParams} />
                </Suspense>
            </div>
        </>
    )
}


