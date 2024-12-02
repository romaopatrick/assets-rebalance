'use client'

import NextAdapterApp from 'next-query-params/app'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { QueryParamProvider } from 'use-query-params'
import Header from './components/header'
import SideNav from './components/sidenav/sidenav'
import 'reflect-metadata';
import './reset.scss'
import { configAxios } from '@/lib/services/common/axios-default'
export default function MainLayout({children}: React.PropsWithChildren) {
    useEffect(() => {
        configAxios()
    }, [])
    return <QueryParamProvider adapter={NextAdapterApp}>
        <ToastContainer
            position="top-center"
            autoClose={3000}
        />
        
        <Header />
        <div className="flex w-full max-w-full overflow-hidden h-[calc(100vh-60px)]">
            <SideNav />
            <div className="flex-1 overflow-auto">
                {children}
            </div>
        </div>
    </QueryParamProvider>
}
