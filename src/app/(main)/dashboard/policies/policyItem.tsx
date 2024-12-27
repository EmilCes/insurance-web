"use client"

import { PolicyItemResponse } from '@/api/policy.api'
import Loading from '@/components/loading/Loading'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const PolicyItem = ({ policyItem }: { policyItem: PolicyItemResponse }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startDate = new Date(policyItem?.startDate);
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + policyItem?.yearsPolicy);

  const isPolicyActive = new Date() < endDate;

  return (
    <>
      {isLoading ? (<Loading></Loading>) : <></>}
      <div className='mb-2 border-slate-400 border-solid border rounded-lg px-6 py-4 grid grid-cols-3'>
        <div className='col-span-2'>
          <h2 className='text-xl font-semibold'>Póliza con <span className='text-2xl text-alternGray '>Plan {policyItem?.planTitle}</span></h2>
          <h4 className="text-alternGray mt-1">ID: <span className='font-semibold'>{policyItem?.serialNumber}</span></h4>

          <div className='grid grid-cols-1 md:grid-cols-2 mt-4'>
            <div className='mb-1'>
              <h4 className="text-alternGray">Inicio de vigencia</h4>
              <h4 className="text-alternGray font-semibold">{startDate.getDay()} de {startDate.toLocaleString('es', { month: 'long' })} del {startDate.getFullYear()}</h4>
            </div>

            <div className='mb-1'>
              <h4 className="text-alternGray">Fin de vigencia</h4>
              <h4 className="text-alternGray font-semibold">{endDate.getDay()} de {endDate.toLocaleString('es', { month: 'long' })} del {endDate.getFullYear()}</h4>
            </div>

            <div className='mb-1'>
              <h4 className="text-alternGray">Vehículo</h4>
              <h4 className="text-alternGray font-semibold">{policyItem?.Vehicle?.Model?.Brand?.name}</h4>
            </div>

            <div className='mb-1'>
              <h4 className="text-alternGray">Modelo</h4>
              <h4 className="text-alternGray font-semibold">{policyItem?.Vehicle?.Model?.year}</h4>
            </div>
          </div>
        </div>
        <div className='flex flex-col mx-auto'>
          <div className='border-slate-400 border-solid border rounded-lg px-4 py-2'>
            <p className='text-lg text-lightBlue font-semibold text-center'>
              {!policyItem?.isCanceled ? (isPolicyActive ? "Vigente" : "Expirada") : "Cancelada"}
            </p>
          </div>
          <Button
            className="text-center flex mt-auto mb-2 min-h-12 bg-darkBlue" onClick={() => { setIsLoading(true); router.push(`/dashboard/policies/${policyItem?.serialNumber}`); }}>
            Ver más
          </Button>
        </div>
      </div>
    </>
  )
}

export default PolicyItem