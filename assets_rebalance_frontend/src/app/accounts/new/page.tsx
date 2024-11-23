'use client'

import BackButton from '@/app/components/buttons/back-button'
import React from 'react'
import AccountForm from '../components/account-form'
export default function NewBankAccount() {
    return (
        <div>
            <BackButton />
            <AccountForm />
        </div>
    )
}
