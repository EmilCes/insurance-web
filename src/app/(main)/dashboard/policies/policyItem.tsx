"use client"

import { PolicyItemResponse } from '@/api/policy.api'
import Loading from '@/components/loading/Loading'
import { Button } from '@/components/ui/button'
import { useStatusPageContext } from '@/lib/statusPage/statusContext'
import { useRouter } from 'next/navigation'
import React from 'react'

const PolicyItem = ({ policyItem }: { policyItem: PolicyItemResponse }) => {
  const router = useRouter();
  const { setIsLoading } = useStatusPageContext();

  const startDate = new Date(policyItem?.startDate);
  const endDate = new Date(startDate);
  endDate.setFullYear(startDate.getFullYear() + policyItem?.yearsPolicy);

  const isPolicyActive = new Date() < endDate;

  return (
    <>
      <div className='mb-2 border-slate-400 border-solid border rounded-lg px-6 py-4'>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          <h2 className='text-lg md:text-xl font-semibold col-start-1 row-start-1 md:col-span-2'>Póliza con <span className='text-xl md:text-2xl text-alternGray '>Plan {policyItem?.planTitle}</span></h2>
          <h4 className="text-alternGray mt-1 col-start-1 row-start-2 col-span-2">ID: <span className='font-semibold'>{policyItem?.serialNumber}</span></h4>
          <div className='border-slate-400 border-solid border rounded-lg px-4 py-2 my-auto col-start-2 md:col-start-3 row-start-1 md:row-span-2'>
            <p className='text-lg text-lightBlue font-semibold text-center'>
              {!policyItem?.isCanceled ? (isPolicyActive ? "Vigente" : "Expirada") : "Cancelada"}
            </p>
          </div>
        </div>
        <div className='grid md:grid-cols-3 gap:5 mt-2'>
          <div className='mb-1 col-start-1 row-start-1'>
            <h4 className="text-alternGray">Inicio de vigencia</h4>
            <h4 className="text-alternGray font-semibold">{startDate.getDate()} de {startDate.toLocaleString('es', { month: 'long' })} del {startDate.getFullYear()}</h4>
          </div>

          <div className='mb-1 col-start-1 md:row-start-2'>
            <h4 className="text-alternGray">Fin de vigencia</h4>
            <h4 className="text-alternGray font-semibold">{endDate.getDate()} de {endDate.toLocaleString('es', { month: 'long' })} del {endDate.getFullYear()}</h4>
          </div>

          <div className='mb-1 md:col-start-2 md:row-start-1 md:ml-10'>
            <h4 className="text-alternGray">Vehículo</h4>
            <h4 className="text-alternGray font-semibold">{policyItem?.Vehicle?.Model?.Brand?.name}</h4>
          </div>

          <div className='mb-1 md:col-start-2 md:row-start-2 md:ml-10'>
            <h4 className="text-alternGray">Modelo</h4>
            <h4 className="text-alternGray font-semibold">{policyItem?.Vehicle?.Model?.year}</h4>
          </div>
          <Button
            className="md:row-start-2 w-2/3 md:w-4/5 mx-auto text-center mt-auto bg-darkBlue" onClick={() => { router.push(`/dashboard/policies/${policyItem?.serialNumber}`); setIsLoading(true); }}>
            Ver más
          </Button>
        </div>
      </div>
    </>
  )
}

export default PolicyItem