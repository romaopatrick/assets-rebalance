import { FinAssetBank } from '@/domain/fin-asset-bank'
import Link from 'next/link'
import React from 'react'
import { finAssetsBankService } from '@/services/fin-assets-bank/fin-assets-bank.service'
import { useLoad } from '@/app/components/hooks/use-load'
import ArchiveButton from '@/app/components/archive-button'

export type BankItemsProps = {
  bank: FinAssetBank
  canArchive?: boolean
  refresh?: () => void
}

export default function BankItem({ bank, refresh, canArchive }: BankItemsProps) {
  const load = useLoad()

  const handleArchiveClick = async () => {
    load.execute(async () => {
      if (bank.enabled) await finAssetsBankService.disable(bank.id!)
      else await finAssetsBankService.enable(bank.id!)
      refresh?.()
    })
  }

  return (
    <>
      <Link
        href={`/banks/${bank.id}`}
        className='bg-slate-600 flex gap-4 items-center 
          cursor-pointer text-slate-300 hover:bg-slate-700 transition-all duration-300 rounded-md p-4 py-6'>
        {canArchive && <ArchiveButton onClick={handleArchiveClick} archived={!bank.enabled} />}
        {bank.iconBase64 && <img className='w-12 bg-slate-200 rounded-md' src={`${bank.iconBase64}`} />}
        <span className='text-2xl'>
          {bank.routing} - {bank.name}
        </span>
      </Link>
    </>
  )
}
