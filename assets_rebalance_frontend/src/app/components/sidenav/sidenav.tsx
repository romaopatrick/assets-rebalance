import React, { PropsWithChildren } from 'react'
import { SidenavItemProps } from './sidenav-item'

const sidenavItems: SidenavItemProps[] = [
]

export default function SideNav({children}: PropsWithChildren) {
    return (
        <div className='lg:w-[15%] h-full flex flex-col bg-slate-800'>{children}</div>
    )
}
