import { currency_f } from '@/utils/numeric'
import React from 'react'
import { FaArrowDown, FaArrowUp, FaMinus, FaPlus } from 'react-icons/fa'

type Props = {
    label?: string
    amount: number
    className?: string
    useSign?: boolean
}

export default function ResumeCard({ label, amount, className, useSign }: Props) {
    const positive = amount >= 0

    return (
        <div className={'flex w-60 h-24 bg-slate-800 flex-col gap-2 rounded-md p-2 ' + className}>
            <span className=''>{label}</span>
            <div className='flex items-center '>
                {useSign
                    && (positive
                        ? <FaPlus size={8} className='text-green-300' />
                        : <FaMinus size={7} className='text-red-400' />)
                }
                <span
                    className={'text-2xl ' + (useSign && (positive ? 'text-green-300' : 'text-red-400'))}>
                    {currency_f(amount)}
                </span>
            </div>
        </div >
    )
}
