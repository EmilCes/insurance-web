"use client"
import React from 'react'
import TitleBar from '@/components/dashboard/TitleBar';
import { StatusPageProvider } from '@/lib/statusPage/statusContext';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <StatusPageProvider>
                <TitleBar title='Mis reportes'></TitleBar>

                <div className="flex justify-center items-center bg-white">
                    <div className="w-full m-0 p-0">
                        {children}
                    </div>
                </div>
            </StatusPageProvider>

        </div>
    )
}

export default layout