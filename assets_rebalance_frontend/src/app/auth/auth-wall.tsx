'use client'

import React, { useEffect, useState } from 'react'
import * as Form from '@radix-ui/react-form'
import { QueryParamProvider } from 'use-query-params'
import NextAdapterApp from 'next-query-params/app'
import { validateApiKey } from '@/app/auth/actions'
import { useLoad } from '@/lib/hooks/use-load'
import { toast } from 'react-toastify'
import { getCookie, setCookie } from 'typescript-cookie'

type Props = React.PropsWithChildren
export default function Auth({ children }: Props) {
    const apiKey = getCookie('apiKey')
    const [valid, setValid] = useState<boolean | undefined>(undefined)

    const load = useLoad()

    const onSubmit = async (apiK: string) => {
        await load.execute(async () => {
            setCookie("apiKey", apiK)

            await validateApiKey()
            setValid(true)

            toast.success("Welcome to your Assets Balancer!!")
        })
    }

    const validate = async () => {
        try {
            await validateApiKey()
            setValid(true)
        } catch (e) {
            setValid(false)
        }
    }

    useEffect(() => {
        validate()
    }, [])


    return (
        <QueryParamProvider adapter={NextAdapterApp}>
                {
                    valid === false && <div className='flex flex-col items-center justify-center m-12'>
                        <AuthForm apiK={apiKey} onSubmit={onSubmit} />
                    </div> 
                }
                { valid === true && children }
        </QueryParamProvider>
    )
}


type AuthFormProps = {
    apiK?: string
    onSubmit: (apiKey: string) => void
}
const AuthForm = ({ apiK, onSubmit }: AuthFormProps) => {
    const [apiKey, setApiKey] = useState(apiK ?? '')


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
