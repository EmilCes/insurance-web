"use client"
import React from 'react'
import Image from "next/image";
import { FormPolicyProvider } from '@/lib/context/formPolicyContext';
import TitleBar from '@/components/dashboard/TitleBar';
import { StatusPageProvider } from '@/lib/statusPage/statusContext';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">

            <FormPolicyProvider>
                <StatusPageProvider>
                    <TitleBar title='Compra de una póliza'></TitleBar>

                    <div className="flex justify-center items-center bg-white">
                        <div className="w-full m-0 p-0">
                            {children}
                        </div>
                    </div>
                </StatusPageProvider>
            </FormPolicyProvider>
        </div>
    )
}

export default layout