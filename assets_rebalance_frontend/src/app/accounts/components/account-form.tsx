'use client'
import React, { useState } from 'react'
import * as Form from '@radix-ui/react-form'
import BanksSelect from '@/app/components/inputs/banks-select'
import { FinAssetBankAccount } from '@/lib/domain/fin-asset-bank-account'
import FormSubmit from '@/app/components/buttons/form-submit'
import { useLoad } from '@/app/components/hooks/use-load'
import { finAssetsBankAccountService } from '@/lib/services/fin-assets-bank-account/fin-assets-bank-account.service'
import { ChangeFinAssetBankAccountInput } from '@/lib/boundaries/change-fin-asset-bank-account.input'
import { useRouter } from 'next/navigation'
import { FinAssetBank } from '@/lib/domain/fin-asset-bank'
import { toast } from 'react-toastify'
import { successSaveToast } from '@/lib/utils/toast'

type Props = {
    account?: FinAssetBankAccount
}

type AccountForm = {
    bank?: FinAssetBank
    name?: string
}

export default function AccountForm({ account }: Props) {
    const [form, setForm] = useState<AccountForm>({
        bank: account?.bank,
        name: account?.name,
    })

    const load = useLoad()
    const router = useRouter()

    const onSave = async () => {
        await load.execute(async () => {
            const input = new ChangeFinAssetBankAccountInput(form.bank?.id ?? '', form.name ?? '', [], account?.id ?? '')
            await finAssetsBankAccountService.change(input)
            successSaveToast('Account')
        })

        router.back()
    }

    return (
        <div className='flex flex-col items-center'>
            <Form.Root className='flex flex-col gap-12 px-6'>
                <span className="text-4xl">Account: {form?.name}</span>
                <div className="flex gap-12">
                    <Form.Field className='flex flex-col gap-2 ' name={'bank'}>
                        <Form.Label>
                            Bank*
                        </Form.Label>
                        <Form.Control asChild>
                            <BanksSelect bank={form.bank} onSelect={b => setForm({ ...form, bank: b })} />
                        </Form.Control>
                    </Form.Field>

                    <Form.Field name="name" className="flex flex-col gap-2">
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            className="w-60 outline-none focus:border-green-800 border-2 text-slate-900 px-2 py-2 rounded-sm" />
                    </Form.Field>
                </div>

                <FormSubmit disabled={load.loading} onSave={onSave} />
            </Form.Root>
        </div>
    )
}
