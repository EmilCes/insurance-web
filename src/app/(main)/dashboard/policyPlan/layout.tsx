import React from 'react'
import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <div className="relative w-full " style={{ height: '12vh'}}>
                <Image 
                    src="/signInBackground.svg"
                    alt="Background"
                    objectFit="cover"
                    layout="fill"
                />
                <h1 className="absolute inset-0 flex items-center text-white text-3xl font-semibold pl-5 max-w-screen-lg">Plan de pólizas</h1>
            </div>

            <div className="flex justify-center items-center bg-white p-8">
                <div className="w-full max-w-screen-lg">                    
                    { children }
                </div>
            </div>

            
        </div>
    )
}

export default layout