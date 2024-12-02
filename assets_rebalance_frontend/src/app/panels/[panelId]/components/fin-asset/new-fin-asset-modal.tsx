import React, { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Form from '@radix-ui/react-form'
import { FinAsset } from '@/lib/domain/fin-asset'
import { FinAssetCategory } from '@/lib/domain/enums/fin-asset-category.enum'
import { FinAssetsGroup } from '@/lib/domain/fin-assets-group'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import { useLoad } from '@/app/components/hooks/use-load'
import { finAssetsBankAccountService } from '@/lib/services/fin-assets-bank-account/fin-assets-bank-account.service'
import FinAssetForm from './fin-asset-form'
import { uuid as v4} from 'uuidv4'
type Props = {
    group: FinAssetsGroup
    onAdd: (fa: FinAsset) => void
}


export default function NewFinAssetModal({ group, onAdd }: Props) {
    const [accounts, setAccounts] = useState<FinAssetBankAccount[]>([])
    const loadAccounts = useLoad()

    const [newAsset, setNewAsset] = useState<FinAsset>({
        accountId: '',
        category: group.category,
        currentAmount: 0,
        name: '',
        score: 0
    })

    const selectedAccount = accounts?.find(x => x.id === newAsset.accountId) ?? accounts?.[0]

    const fetchAccounts = async () => {
        await loadAccounts.execute(async () => {
            const accs = await finAssetsBankAccountService.all(true)
            setAccounts(accs)
        })
    }

    const handleChange = (fa: FinAsset) => {
        setNewAsset({...fa})
    }

    const handleAdd = () => {
        onAdd?.(newAsset)
        setNewAsset({
            accountId: '',
            category: group.category,
            currentAmount: 0,
            name: '',
            score: 0
        })
    } 

    useEffect(() => {
        fetchAccounts()
    }, [])

    return (
        <Dialog.Root>
            <Dialog.Trigger
                className='flex text-slate-100 hover:bg-green-700 bg-green-800 w-16 h-14 items-center justify-center
      rounded-md transition-all duration-300 cursor-pointer
      flex-col'><span className='text-xs'>New</span>
                <span>Asset</span></Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black opacity-50 data-[state=open]:animate-overlayShow' />
                <Dialog.Content className='fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-800 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
                    <Dialog.Title className='text-3xl'>Asset {newAsset.name}</Dialog.Title>
                    <br />
                    <FinAssetForm account={selectedAccount} asset={newAsset} onChange={handleChange} />
                    <Dialog.Close asChild>
                        <button onClick={handleAdd}
                            className='w-full mt-12 bg-green-800 p-2 rounded-md hover:bg-green-600 transition-colors duration-200'
                        >Add</button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
