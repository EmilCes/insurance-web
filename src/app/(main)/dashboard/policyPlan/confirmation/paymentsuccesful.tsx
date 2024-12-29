"use client"

import { CreatePolicyResponse } from '@/api/policy.api';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

const PaymentPolicySuccesful = ({ newPolicy }: { newPolicy: CreatePolicyResponse | undefined }) => {
    const router = useRouter();

    return (
        <>
            {newPolicy ? (<>
                <div className="mx-auto w-full max-w-screen-lg p-8">
                    <h2 className='text-2xl font-semibold'>Póliza adquirida exitosamente</h2>
                    <h4 className="text-alternGray mb-4">Puede consultar su póliza después o ahora</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12 border-solid border rounded-lg border-stone-300 py-6 px-8">
                        <div>
                            <h2 className='text-2xl font-semibold mb-4'>Plan {newPolicy.planTitle}</h2>
                            <h4 className="text-alternGray">{newPolicy.planDescription}</h4>
                        </div>
                        <div className='flex justify-center my-auto'>
                            <Button className='bg-darkBlue'
                                onClick={() => { router.push(`/dashboard/policies/${newPolicy.serialNumber}`) }}>
                                Ver detalles póliza
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <br className="hidden md:block" />
                        <Button className='w-4/5 text-center flex justify-center mt-4 min-h-12 bg-darkBlue'
                            onClick={() => router.push("/dashboard")}>
                            Regresar al inicio
                        </Button>
                    </div>

                </div>
            </>) : (<></>)}
        </>

    )
}

export default PaymentPolicySuccesful