import React, { Suspense } from 'react'
import RedirectPlusButton from '../components/buttons/redirect-plus-button'
import OnlyActiveSwitch from '../components/inputs/only-active-switch'
import BankItemsList from './components/bank-items-list'
type Props = {
    searchParams: any
}
export default function Banks({searchParams}: Props) {
    return (
        <>
            <RedirectPlusButton href='/banks/new' />
            <div className='flex justify-end w-full pt-3 pr-3'>
                <Suspense>
                    <OnlyActiveSwitch />
                </Suspense>
            </div>
            <div className='flex pl-12 flex-col items-center'>
                <h1 className='text-5xl self-start text-slate-50'>Banks</h1>
                <Suspense fallback={<span>Loading...</span>}>
                    <BankItemsList searchParams={searchParams}/>
                </Suspense>
            </div>
        </>
    )
}


