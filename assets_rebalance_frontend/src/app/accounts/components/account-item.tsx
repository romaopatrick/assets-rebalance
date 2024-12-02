import ArchiveBankButton from '@/app/components/buttons/archive-button'
import BankItem from '@/app/banks/components/bank-item'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import Link from 'next/link'
import React from 'react'
import { finAssetsBankAccountService } from '@/lib/services/fin-assets-bank-account/fin-assets-bank-account.service'
import { useLoad } from '@/app/components/hooks/use-load'
import Image from 'next/image'

type Props = {
    account: FinAssetBankAccount
    refresh: () => void
}

export default function AccountItem({ account, refresh }: Props) {
    const load = useLoad()

    const handleArchiveClick = async () => {
        await load.execute(async () => {
            if (account.enabled) await finAssetsBankAccountService.disable(account.id!)
            else await finAssetsBankAccountService.enable(account.id!)
            refresh?.()
        })
    }
    return (
        <Link href={`/accounts/${account.id}`}
            className='bg-slate-600 flex gap-3 items-center 
          cursor-pointer text-slate-300 hover:bg-slate-700 transition-all duration-300 rounded-md px-3 py-2'>
            <ArchiveBankButton onClick={handleArchiveClick} archived={!account.enabled} />
            <div className='flex gap-2 items-center'>
                {account?.bank?.iconBase64 && <Image src={account.bank.iconBase64} className='rounded-md bg-slate-200' width={40} height={40} alt={'bank icon'} />}
                <span className='text-xl'>{account.name}</span>
            </div>
        </Link>
    )
}
