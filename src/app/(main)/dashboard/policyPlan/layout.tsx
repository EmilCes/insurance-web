"use client"
import React from 'react'
import Image from "next/image";
import { FormPolicyProvider } from '@/lib/context/formPolicyContext';
import TitleBar from '@/components/dashboard/TitleBar';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">

            <FormPolicyProvider>
                <TitleBar title='Compra de una póliza'></TitleBar>

                <div className="flex justify-center items-center bg-white">
                    <div className="w-full">
                        {children}
                    </div>
                </div>

            </FormPolicyProvider>
        </div>
    )
}

export default layout