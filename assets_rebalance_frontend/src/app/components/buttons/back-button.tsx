import Link from 'next/link'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export default function BackButton() {
    return (
        <Link
            className='flex hover:text-slate-300 hover:underline gap-1 items-center pt-2 text-xl px-2'
            href={"."}>
            <IoIosArrowBack />
            <span>Back</span>
        </Link>
    )
}
