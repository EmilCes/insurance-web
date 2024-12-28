"use client"

import { cancelPolicy } from '@/api/policy.api';
import Loading from '@/components/loading/Loading';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CancelPolicy = ({ idPolicy, closeMessage }: { idPolicy: string; closeMessage: () => void }) => {
    const alertImage = '/alert-icon.svg';
    const crossImage = '/cross-icon.svg';
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const cancelCurrentPolicy = async () => {
        setIsLoading(true);
        const response = await cancelPolicy(idPolicy);
        if (response == 204) {
            window.location.reload();
        }
        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? (<Loading></Loading>) : (<></>)}
            <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-40 z-50'>
                <div className='bg-white m-20 rounded-lg'>
                    <div className='pt-4'>
                        <button
                            className="flex items-center justify-between h-20 ml-auto mr-4"
                            style={{
                                backgroundImage: `url(${crossImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: "30px",
                                height: "30px",
                            }}
                            onClick={() => closeMessage()}
                        ></button>
                        <div
                            className="flex items-center justify-between h-20 mx-auto"
                            style={{
                                backgroundImage: `url(${alertImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: "60px",
                                height: "60px"
                            }}
                        ></div>
                        <h1 className='text-red-900 text-2xl font-semibold text-center'>Cancelación de la póliza</h1>
                        <h1 className='text-red-900 text-2xl font-semibold text-center mb-4'>#{idPolicy}</h1>
                    </div>

                    <div className='bg-gray-300 py-4 rounded-b-lg'>
                        <div className='px-6'>
                            <h3 className='w-4/5 m-auto text-lg font-semibold text-center'>¿Está de acuerdo en que desea cancelar la póliza de seguro para su auto?</h3>
                            <h4 className='text-center'>Esta acción es irreversible</h4>
                            <Button
                                className="mt-2 mx-auto md:w-1/3 text-center flex justify-center min-h-8 bg-red-950"
                                onClick={() => cancelCurrentPolicy()}>
                                Cancelar póliza
                            </Button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default CancelPolicy