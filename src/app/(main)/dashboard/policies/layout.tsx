"use client"
import React from 'react'
import Image from "next/image";
import TitleBar from '@/components/dashboard/TitleBar';
import { StatusPageProvider } from '@/lib/statusPage/statusContext';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <StatusPageProvider>
                <TitleBar title='Mis pólizas'></TitleBar>

                <div className="flex justify-center items-center bg-white">
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </StatusPageProvider>
        </>
    )
}

export default layout