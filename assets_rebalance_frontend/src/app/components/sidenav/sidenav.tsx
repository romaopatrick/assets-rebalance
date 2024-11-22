import React from 'react'
import SidenavItem, { SidenavItemProps } from './sidenav-item'

const sidenavItems: SidenavItemProps[] = [
    {
        id: 'banks',
        icon: <>'B'</>,
        label: 'My Banks',
        path: '/banks'
    }
]

export default function SideNav() {
    const renderItems = (items: SidenavItemProps[]) => {
        return items.map(item =>
            <SidenavItem key={item.id} {...item} />
        )
    }

    return (
        <div className='lg:w-[15%] h-full flex flex-col bg-slate-800 '>{
            renderItems(sidenavItems)
        }</div>
    )
}
