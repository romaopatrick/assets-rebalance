export type SidenavItemProps = {
    label: string
    icon: React.ReactElement
}

export default function SidenavItem(
    { label, icon }: SidenavItemProps
) {
    return <div className="flex gap-3 p-6 items-center">
        <span>{icon}</span>
        <span>{label}</span>
    </div>
}