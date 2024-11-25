import React from 'react'
import SidenavItem, { SidenavItemProps } from './sidenav-item'
import { MdOutlineAccountBalance } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { PiMoneyWavyFill } from "react-icons/pi";

const sidenavItems: SidenavItemProps[] = [
    {
        id: 'banks',
        icon: <MdOutlineAccountBalance size={25}/>,
        label: 'Banks',
        path: '/banks'
    },
    {
        id: 'accounts',
        icon: <FaWallet size={22}/>,
        label: 'Accounts',
        path: '/accounts'
    },
    {
        id: 'dashboard',
        icon: <TbLayoutDashboardFilled size={25}/>,
        label: 'Dashboard',
        path: '/dashboard'
    },
    {
        id: 'assets',
        icon: <PiMoneyWavyFill size={25}/>,
        label: 'Rebalance Panel',
        path: '/assetspanel'
    }
]

export default function SideNav() {
    return (
        <div className='lg:w-[15%] h-full py-2 flex flex-col gap-2 bg-slate-800 items-center'>{
            sidenavItems.map(item =>
                <SidenavItem key={item.id} {...item} />
            )
        }</div>
    )
}
