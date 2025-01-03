'use client'

import React, { useEffect, useState } from 'react'
import * as Form from '@radix-ui/react-form'
import { QueryParamProvider } from 'use-query-params'
import NextAdapterApp from 'next-query-params/app'
import { validateApiKey } from '@/app/auth/actions'
import { useLoad } from '@/lib/hooks/use-load'
import { toast } from 'react-toastify'
import { getCookie, setCookie } from 'typescript-cookie'
import AuthForm from './components/auth-form'

type Props = React.PropsWithChildren
export default function Auth({ children }: Props) {
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
        <>
            {
                valid === false && <div className='flex flex-col items-center justify-center m-12'>
                    <AuthForm onSubmit={onSubmit} />
                </div>
            }
            {valid === true && children}
        </>
    )
}
