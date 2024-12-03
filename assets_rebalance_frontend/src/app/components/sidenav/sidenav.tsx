import React, { Suspense } from 'react'
import SidenavItem, { SidenavItemProps } from './sidenav-item'
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BiSolidBank } from "react-icons/bi";
import { RiWallet2Fill } from "react-icons/ri";
import { FaSliders } from "react-icons/fa6";


const sidenavItems: SidenavItemProps[] = [
    {
        id: 'banks',
        icon: <BiSolidBank size={20} />,
        label: 'Banks',
        path: '/banks'
    },
    {
        id: 'accounts',
        icon: <RiWallet2Fill size={20} />,
        label: 'Accounts',
        path: '/accounts'
    },
    {
        id: 'dashboard',
        icon: <TbLayoutDashboardFilled size={20} />,
        label: 'Dashboard',
        path: '/dashboard'
    },
    {
        id: 'panels',
        icon: <FaSliders size={20} />,
        label: 'Panels',
        path: '/panels'
    }
]

export default function SideNav() {
    return (
        <div className='lg:w-[240px] h-full py-2 flex flex-col gap-2 bg-slate-800 items-center'>
            <Suspense>
                {
                    sidenavItems.map(item =>
                        <SidenavItem key={item.id} {...item} />
                    )
                }
            </Suspense>
        </div>
    )
}
