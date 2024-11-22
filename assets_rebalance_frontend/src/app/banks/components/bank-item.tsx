import { FinAssetBank } from '@/domain/fin-asset-bank'
import React from 'react'

export type BankItemsProps = {
    bank: FinAssetBank
}

export default function BankItem({bank} : BankItemsProps) {
  return (
    <div className='bg-slate-600 rounded-md p-4'>
        {bank.routing} - {bank.name}
    </div>
  )
}
