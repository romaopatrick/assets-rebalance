import { finAssetsBankService } from '@/services/fin-assets-bank/fin-assets-bank-service'
import React from 'react'
import BankItem from './components/bank-item'
import AddBankButton from './components/add-bank-button'

export default async function Banks() {
    try {
        const banks = await finAssetsBankService.all()
        const bankItems = banks.map(x => <BankItem key={x.id} bank={x} />)
        return (
            <div className=''>
                <AddBankButton/>
                <div className='m-12 flex gap-4 flex-wrap'>
                    {bankItems}
                </div>
            </div>
        )

    } catch (error) {
        console.error(error)
    }
}