"use client"

import { CreatePolicyResponse } from '@/api/policy.api';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

const CreateReportSuccessful = ({ newPolicy }: { newPolicy: CreatePolicyResponse | undefined }) => {
    const router = useRouter();

    return (
        <>
            {newPolicy ? (<>
                <div className="mx-auto w-full max-w-screen-lg p-8">
                    <h2 className='text-2xl font-semibold'>Reporte creado exitosamente</h2>
                    <h4 className="text-alternGray mb-4">El numero de reporte es </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12 border-solid border rounded-lg border-stone-300 py-6 px-8">
                        <div>
                            <h2 className='text-2xl font-semibold mb-4 text-center md:text-start'>Plan {newPolicy.planTitle}</h2>
                            <h4 className="text-alternGray text-center md:text-start">{newPolicy.planDescription}</h4>
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
                        <Button className='w-4/5 text-center mx-auto mt-4 min-h-12 bg-darkBlue'
                            onClick={() => router.push("/dashboard")}>
                            Regresar al inicio
                        </Button>
                    </div>

                </div>
            </>) : (<></>)}
        </>

    )
}

export default CreateReportSuccessful;