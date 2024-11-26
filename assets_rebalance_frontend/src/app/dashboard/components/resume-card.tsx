import { currency_f } from '@/utils/numeric'
import React from 'react'

type Props = {
    label?: string
    amount: number
    className?: string
}

export default function ResumeCard({ label, amount, className }: Props) {
    return (
        <div className={'flex w-60 h-24 bg-slate-800 flex-col gap-2 rounded-md p-2 ' + className}>
            <span className=''>{label}</span>
            <span className='text-2xl'>
                {currency_f(amount)}
            </span>
        </div >
    )
}
