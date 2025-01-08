"use client"

import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const ErrorMessage = ({ customTitle = "", customMessage = "" }: { customTitle?: string, customMessage?: string }) => {
    const router = useRouter();
    const sadImage = '/sad-icon.svg';

    return (
        <>
            <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-40 z-50'>
                <div className='bg-white m-20 rounded-lg py-6 px-2'>
                    <div className='pt-4'>
                        <div
                            className="flex items-center justify-between h-20 mx-auto"
                            style={{
                                backgroundImage: `url(${sadImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: "60px",
                                height: "60px"
                            }}
                        ></div>
                        <h1 className='text-red-900 text-2xl font-semibold text-center mb-2'>
                            {customTitle || "¡Algo salió mal!"}
                        </h1>
                        <h3 className='w-4/5 m-auto text-lg text-center mb-2'>
                            {customMessage || "Ha ocurrido un error con nuestro servidor, por favor intente otra vez más tarde"}
                        </h3>
                    </div>

                    <div className='px-6 md:flex'>

                        <Button
                            className="mt-2 mx-auto md:w-1/3 text-center flex justify-center min-h-8 bg-white text-alternGray border border-alternGray hover:text-white"
                            onClick={() => router.push("/dashboard")}>
                            Regresar a inicio
                        </Button>

                        <Button
                            className="mt-2 mx-auto md:w-1/3 text-center flex justify-center min-h-8 bg-red-950 hover:bg-red-700"
                            onClick={() => window.location.reload()}>
                            Volver a intentar
                        </Button>
                    </div>


                </div>
            </div>
        </>
    )
}

export default ErrorMessage