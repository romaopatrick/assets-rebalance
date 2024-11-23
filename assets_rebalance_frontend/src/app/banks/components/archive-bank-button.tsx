import React from 'react'
import { MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
type Props = {
    archived?: boolean
    bankId: string
    onClick: () => void
}
export default function ArchiveBankButton({ bankId, archived, onClick }: Props) {
    return (
        <div
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                onClick()
            }} className={`transition-all duration-300 
            cursor-pointer p-1 rounded-md flex items-center justify-center 
            bg-slate-800
            ${archived ? 'hover:text-green-400' : 'hover:text-red-400 '}
            `} >
            {archived ? <MdOutlineUnarchive size={22} /> : <MdOutlineArchive size={22} />}
        </div>
    )
}
