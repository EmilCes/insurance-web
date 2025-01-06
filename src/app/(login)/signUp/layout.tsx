"use client"
import React from 'react'
import { UserProvider } from '@/lib/context/userSignUpContext'; // Asegúrate de importar UserProvider
import TitleBar from '@/components/dashboard/TitleBar';
import { StatusPageProvider } from '@/lib/statusPage/statusContext';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <UserProvider>
                <StatusPageProvider>
                    <div className="flex justify-center items-center bg-white">
                        <div className="w-full m-0 p-0">
                            {children}
                        </div>
                    </div>
                </StatusPageProvider>
            </UserProvider>
        </div>
    )
}

export default layout;
