import Link from 'next/link'
import React from 'react'

export default function AddBankButton() {
  return (
    <Link className='absolute flex text-slate-100 hover:bg-slate-700 bg-slate-800 w-14 h-14 items-center justify-center right-0 bottom-0 m-5
      rounded-md
    '
      href={'/banks/new'}>
      +
    </Link>
  )
}
