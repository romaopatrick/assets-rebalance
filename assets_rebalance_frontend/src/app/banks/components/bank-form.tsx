'use client'

import FormControlNumeric from "@/app/components/inputs/form-control-numeric";
import { useErrorHandler } from "@/app/components/hooks/use-error-handler";
import { useLoad } from "@/app/components/hooks/use-load";
import { ChangeFinAssetBankInput } from "@/boundaries/change-fin-asset-bank.input";
import { FinAssetBank } from "@/domain/fin-asset-bank";
import { finAssetsBankService } from "@/services/fin-assets-bank/fin-assets-bank.service";
import * as Form from "@radix-ui/react-form";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import FormControlImageBase64 from "@/app/components/inputs/form-control-image-base64";
import FormSubmit from "@/app/components/buttons/form-submit";
import { successSaveToast } from "@/utils/toast";

type Props = {
    bank?: FinAssetBank
}
type BankForm = {
    name: string
    routing: string
    iconBase64?: string | null; // optional
}

export default function BankForm({ bank: defaultBank }: Props) {
    const [bank, setBank] = useState<BankForm>({
        name: defaultBank?.name ?? '',
        routing: defaultBank?.routing ?? '',
        iconBase64: defaultBank?.iconBase64 ?? ''
    })
    const load = useLoad()
    const router = useRouter()

    const onSave = async () => {
        await load.execute(async () => {
            const input = new ChangeFinAssetBankInput(
                bank.name,
                bank.routing,
                defaultBank?.id,
                null,
                null,
                bank.iconBase64)

            await finAssetsBankService.change(input)
            successSaveToast('Bank')
        })

        router.back()
    }
    return (
        <div className="flex flex-col items-center">
            <Form.Root className="flex flex-col gap-12 px-6">
                <span className="text-4xl">Bank: {bank?.name}</span>
                <div className="flex gap-12">
                    <Form.Field name="name" className="flex flex-col gap-2">
                        <Form.Label>Routing*</Form.Label>
                        <Form.Control
                            required maxLength={8}
                            value={bank.routing}
                            onChange={(e) => setBank({ ...bank, routing: e.target.value })}
                            className="w-40 outline-none items-center focus:border-pink-800 border-2 text-slate-900 px-2 py-2 rounded-sm" />
                    </Form.Field>
                    <Form.Field name="name" className="flex flex-col gap-2">
                        <Form.Label>Name*</Form.Label>
                        <Form.Control
                            value={bank.name}
                            onChange={(e) => setBank({ ...bank, name: e.target.value })}
                            required
                            className="w-60 outline-none focus:border-pink-800 border-2 text-slate-900 px-2 py-2 rounded-sm" />
                    </Form.Field>

                    <Form.Field name="iconBase64" className="flex flex-col gap-2">
                        <Form.Label>Icon</Form.Label>
                        <FormControlImageBase64
                            base64={bank.iconBase64 ?? undefined}
                            onChange={(b) => setBank({ ...bank, iconBase64: b })} />
                    </Form.Field>

                </div>
                <FormSubmit disabled={load.loading} onSave={onSave} />
            </Form.Root>
        </div>
    )
}
