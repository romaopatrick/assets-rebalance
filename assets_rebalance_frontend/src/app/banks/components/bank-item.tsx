import { FinAssetBank } from '@/domain/fin-asset-bank'
import React from 'react'

export type BankItemsProps = {
  bank: FinAssetBank
}

export default function BankItem({ bank }: BankItemsProps) {
  return (
    <div className='bg-slate-600 rounded-md p-4'>

      <img width={60} src={bank.iconBase64 ? `data:application/octet-stream;base64,${bank.iconBase64}` : undefined} />
      <span>
        {bank.routing} - {bank.name}
      </span>
    </div>
  )
}
