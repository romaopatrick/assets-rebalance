import React from 'react'
import SidenavItem, { SidenavItemProps } from './sidenav-item'

const sidenavItems: SidenavItemProps[] = [
    {
        id: 'banks',
        icon: <>'B'</>,
        label: 'My Banks',
        path: '/banks'
    },
    {
        id: 'accounts',
        icon: <>'A'</>,
        label: 'My Accounts',
        path: '/accounts'
    }
]

export default function SideNav() {
    const renderItems = (items: SidenavItemProps[]) => {
        return items.map(item =>
            <SidenavItem key={item.id} {...item} />
        )
    }

    return (
        <div className='lg:w-[15%] h-full py-2 flex flex-col gap-2 bg-slate-800 items-center'>{
            renderItems(sidenavItems)
        }</div>
    )
}
