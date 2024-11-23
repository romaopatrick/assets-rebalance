'use client'

import { useErrorHandler } from '@/app/components/hooks/use-error-handler'
import React, { useEffect } from 'react'

type Props = {
    error: Error
}

export default function EditBankError({ error }: Props) {
    const { handleError } = useErrorHandler()
    useEffect(() => {
        handleError(error)
    }, [error])

    return (
        <></>
    )
}
