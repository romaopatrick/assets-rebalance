import Link from 'next/link'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import BankForm from '../components/bank-form'
import { finAssetsBankService } from '@/services/fin-assets-bank/fin-assets-bank.service'
import BackButton from '@/app/components/buttons/back-button'

type Props = {
    params: {
        bankId: string
    }
}

export default async function EditBank({ params: { bankId } }: Props) {
    const bank = await finAssetsBankService.getById(bankId)

    return (
        <div>
            <BackButton />
            <div className=''>
                {bank
                    ? <BankForm bank={bank} />
                    : <span>Bank not found</span>
                }
            </div>
        </div>
    )
}
