'use client'

import * as Form  from "@radix-ui/react-form"
import { useState } from "react"

type AuthFormProps = {
    onSubmit: (apiKey: string) => void
}

export default function AuthForm({ onSubmit }: AuthFormProps) {
    const [apiKey, setApiKey] = useState('')

    return <Form.Root action={() => { }} className='flex flex-col gap-4 items-start bg-slate-900 rounded-xl p-4'>
        <Form.Field name='apiKey' className='flex flex-col gap-2'>
            <Form.Label>Api Key</Form.Label>
            <Form.Control autoFocus value={apiKey} onChange={v => setApiKey(v.target.value)}
                className='bg-slate-700 outline-none p-2 rounded-md' />
        </Form.Field>

        <button type="submit" onClick={() => onSubmit(apiKey)}
            className='rounded-lg bg-green-600 hover:bg-green-700 p-2 px-12 '
        >Sign In</button>
    </Form.Root>
}