import Link from 'next/link'
import React from 'react'
type Props = {
  href: string
}

export default function RedirectPlusButton({ href }: Props) {
  return (
    <Link className='absolute flex text-slate-100 hover:bg-slate-700 bg-slate-800 w-14 h-14 items-center justify-center right-0 bottom-0 m-5
      rounded-md
    '
      href={href}>
      +
    </Link>
  )
}
