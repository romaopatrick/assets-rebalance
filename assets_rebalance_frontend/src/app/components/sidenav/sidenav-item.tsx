'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export type SidenavItemProps = {
    id: string
    label: string
    icon: React.ReactElement
    path?: string
}

export default function SidenavItem(
    { label, icon, id, path }: SidenavItemProps
) {
    const pathname = usePathname()
    const selected = path && pathname.startsWith(path)

    return <Link className={
            `flex hover:bg-slate-900 ${selected && 'bg-slate-900 hover:bg-slate-950'} 
            rounded-md transition-all text-sm duration-200 py-2 w-[95%] px-6 gap-3 items-center`
        }
            href={path ?? '/'}>
        <span>{icon}</span>
        <span>{label}</span>
    </Link>
}