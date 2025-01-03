"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'

const PageNoAuth = () => {
    const router = useRouter();
    const backgroundImage = '/signInBackground.svg';
    const lockImage = '/lock-icon.svg';

    return (
        <div className="flex h-screen">
            <div
                className="w-1/3 bg-cover bg-center hidden md:block"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            ></div>

            <div className='flex-1 flex flex-col items-center md:items-start justify-center md:p-32 p-8'>
                <div className=" items-center justify-center grid py-8">
                    <div
                        className="bg-cover bg-center m-auto md:m-0"
                        style={{
                            backgroundImage: `url(${lockImage})`,
                            width: '160px',
                            height: '160px',
                        }}
                    ></div>
                    <h1 className="md:col-span-2 md:col-start-2 text-4xl md:text-6xl font-bold text-gray-800 mt-6">Acceso denegado</h1>
                </div>

                <p className="text-center md:text-left mb-4 font-semibold text-xl">
                    Perdón, no tiene los permisos para acceder a esta página
                </p>
                <p className="text-center md:text-left ">
                    Por favor regrese al inicio o contacte al administrador para acceder al contenido
                </p>

                <Button
                    className=" mt-4 mx-auto text-center flex justify-center min-h-8 bg-white text-alternGray border border-alternGray hover:text-white"
                    onClick={() => router.push("/dashboard")}>
                    Regresar a inicio
                </Button>

            </div>

        </div>
    )
}

export default PageNoAuth