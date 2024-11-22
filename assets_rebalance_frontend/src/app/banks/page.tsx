import { finAssetsBankService } from '@/services/fin-assets-bank/fin-assets-bank-service'
import React from 'react'
import BankItem from './components/bank-item'

export default async function Banks() {
    try {
        const banks = await finAssetsBankService.all()
        const bankItems = banks.map(x => <BankItem key={x.id} bank={x}/>)
        return (
            <div>
                {bankItems}
            </div>
        )

    } catch(error) {
        console.error(error)
    }
}