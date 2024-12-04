'use client'

import { FinAssetBank } from '@/lib/domain/fin-asset-bank'
import Link from 'next/link'
import React from 'react'
  import * as finAssetsBankService  from '@/lib/api/fin-assets-bank/fin-assets-bank.service'
import { useLoad } from '@/app/components/hooks/use-load'
import ArchiveButton from '@/app/components/buttons/archive-button'
import Image from 'next/image'

export type BankItemsProps = {
  bank: FinAssetBank
  canArchive?: boolean
  refresh?: () => void
}

export default function BankItem({ bank, refresh, canArchive }: BankItemsProps) {
  const load = useLoad()

  const handleArchiveClick = async () => {
    await load.execute(async () => {
      if (bank.enabled) await finAssetsBankService.disableBank(bank.id!)
      else await finAssetsBankService.enableBank(bank.id!)
      refresh?.()
    })
  }

  return (
    <>
      <Link
        href={`/banks/${bank.id}`}
        className='bg-slate-600 flex gap-3 items-center 
          cursor-pointer text-slate-300 hover:bg-slate-700 transition-all duration-300 rounded-md px-3 py-2'>
        {canArchive && <ArchiveButton onClick={handleArchiveClick} archived={!bank.enabled} />}
        {bank.iconBase64 && <Image width={40} height={40} className='bg-slate-200 rounded-md' src={`${bank.iconBase64}`} alt={'bank icon'} />}
        <span className='text-xl'>
          {bank.routing} - {bank.name}
        </span>
      </Link>
    </>
  )
}
