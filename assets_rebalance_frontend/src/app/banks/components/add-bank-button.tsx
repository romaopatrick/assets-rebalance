import Link from 'next/link'
import React from 'react'

export default function AddBankButton() {
  return (
    <Link href={'/banks/new'}>+</Link>
  )
}
