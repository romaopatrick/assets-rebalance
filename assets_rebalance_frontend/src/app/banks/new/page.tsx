import Link from 'next/link'
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import BankForm from '../components/bank-form';
import BackButton from '@/app/components/buttons/back-button';

export default function NewBank() {
  return (
    <div>
      <BackButton />
      <BankForm />
    </div>
  )
}
