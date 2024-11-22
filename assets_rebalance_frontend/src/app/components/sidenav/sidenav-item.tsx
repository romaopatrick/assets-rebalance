import Link from "next/link"

export type SidenavItemProps = {
    id: string
    label: string
    icon: React.ReactElement
    path?: string
}

export default function SidenavItem(
    { label, icon, id, path }: SidenavItemProps
) {
    return <Link className="flex hover:bg-slate-900 transition-all duration-200 p-6 gap-3 items-center" href={path ?? '/'}>
        <span>{icon}</span>
        <span>{label}</span>
    </Link>
}