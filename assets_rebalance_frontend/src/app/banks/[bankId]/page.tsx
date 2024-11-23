import Link from 'next/link'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import BankForm from '../components/bank-form'
import { finAssetsBankService } from '@/services/fin-assets-bank/fin-assets-bank-service'

type Props = {
    params: {
        bankId: string
    }
}

export default async function EditBank({ params: { bankId } }: Props) {
    const bank = await finAssetsBankService.getById(bankId).catch()

    return (
        <div>
            <Link
                className='flex hover:text-slate-300 hover:underline gap-1 items-center pt-2 text-xl px-2'
                href={"."}>
                <IoIosArrowBack />
                <span>Back</span>
            </Link>
            <div className=''>
                { bank 
                    ? <BankForm bank={bank}/>
                    : <span>Bank not found</span>
                }
            </div>
        </div>
    )
}
