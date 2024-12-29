"use client"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'

const NotFound = () => {
    const router = useRouter();
    const backgroundImage = '/signInBackground.svg';
    const missingImage = '/missing-icon.svg';

    return (
        <div className="flex h-screen">
            <div
                className="w-1/3 bg-cover bg-center hidden md:block"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            ></div>

            <div className='flex-1 flex flex-col items-center md:items-start justify-center md:p-40 p-8'>
                <div className=" items-center justify-center grid py-8">
                    <div
                        className="bg-cover bg-center row-span-2"
                        style={{
                            backgroundImage: `url(${missingImage})`,
                            width: '160px',
                            height: '160px',
                        }}
                    ></div>
                    <h1 className="md:col-span-2 md:col-start-2 text-6xl font-bold text-gray-800 mt-6">404</h1>
                    <h2 className="md:col-span-2 md:col-start-2 text-4xl font-semibold text-gray-800 mt-2">Recurso no encontrado</h2>
                </div>

                <p className="text-left mb-4 font-semibold text-xl">
                    ¡Uh oh! Parece que no podemos encontrar la página que estaba buscando.
                </p>
                <p className="text-left">
                    Intente regresar a la página previa o al inicio.
                </p>

                <Button
                    className=" mt-2 mx-auto text-center flex justify-center min-h-8 bg-white text-alternGray border border-alternGray hover:text-white"
                    onClick={() => router.push("/dashboard")}>
                    Regresar a inicio
                </Button>

            </div>

        </div>
    )
}

export default NotFound