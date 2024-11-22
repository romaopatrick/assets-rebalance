import { FinAssetBank } from '@/domain/fin-asset-bank'
import React from 'react'

export type BankItemsProps = {
    bank: FinAssetBank
}

export default function BankItem({bank} : BankItemsProps) {
  return (
    <div>
        {bank.routing} - {bank.name}
    </div>
  )
}
