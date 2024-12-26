"use client"
import React from 'react'
import Image from "next/image";
import TitleBar from '@/components/dashboard/TitleBar';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <TitleBar title='Mis pólizas'></TitleBar>

            <div className="flex justify-center items-center bg-white p-8">
                <div className="w-full max-w-screen-lg">
                    {children}
                </div>
            </div>
        </>
    )
}

export default layout