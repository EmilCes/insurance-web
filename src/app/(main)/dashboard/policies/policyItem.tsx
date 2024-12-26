import { Button } from '@/components/ui/button'
import React from 'react'

const PolicyItem = () => {
  return (
    <div className='mb-2 border-slate-400 border-solid border rounded-lg px-6 py-4 grid grid-cols-3'>
      <div className='col-span-2'>
        <h2 className='text-xl font-semibold'>Póliza con <span className='text-2xl text-alternGray '>Plan Amplia Plus</span></h2>
        <h4 className="text-alternGray mt-1">ID: <span className='font-semibold'>0db4b593-e3d3-4876-82e8-d7ed9562c6b2</span></h4>

        <div className='grid grid-cols-1 md:grid-cols-2 mt-4'>
          <div className='mb-1'>
            <h4 className="text-alternGray">Inicio de vigencia</h4>
            <h4 className="text-alternGray font-semibold">12 de diciembre del 2023</h4>
          </div>

          <div className='mb-1'>
            <h4 className="text-alternGray">Fin de vigencia</h4>
            <h4 className="text-alternGray font-semibold">12 de diciembre del 2023</h4>
          </div>

          <div className='mb-1'>
            <h4 className="text-alternGray">Vehículo</h4>
            <h4 className="text-alternGray font-semibold">Chevrolet Spark</h4>
          </div>

          <div className='mb-1'>
            <h4 className="text-alternGray">Modelo</h4>
            <h4 className="text-alternGray font-semibold">2017</h4>
          </div>
        </div>
      </div>
      <div className='flex flex-col mx-auto'>
        <div className='border-slate-400 border-solid border rounded-lg px-4 py-2'>
          <p className='text-lg text-lightBlue font-semibold text-center'>Vigente</p>
        </div>
        <Button
          className="text-center flex mt-auto mb-2 min-h-12 bg-darkBlue">
          Ver más
        </Button>
      </div>
    </div>
  )
}

export default PolicyItem