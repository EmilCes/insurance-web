import { Button } from '@/components/ui/button'
import React from 'react'
import PolicyItem from './policyItem'
import { Input } from '@/components/ui/input'

const PoliciesList = () => {
  return (
    <>
      <div className='grid grid-cols-4 gap-8'>
        <div className=''>
          <h2 className='text-2xl font-semibold'>Categorías</h2>

          <hr className="h-0.5 bg-slate-400 mt-2 mb-4"></hr>

          <p className='text-lg font-semibold text-alternGray mb-2'>Tipo de póliza</p>
          <div className='flex mb-1'>
            <Input type='radio' name='typePolicy'
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>Plan Amplia Plus</label>
          </div>
          <div className='flex mb-1'>
            <Input type='radio' name='typePolicy'
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>Plan Amplia</label>
          </div>

          <hr className="h-0.5 bg-slate-400 mt-4 mb-4"></hr>

          <p className='text-lg font-semibold text-alternGray mb-2'>Estado de póliza</p>
          <div className='flex mb-1'>
            <Input type='radio' name='typePolicy'
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>Vigente</label>
          </div>
          <div className='flex mb-1'>
            <Input type='radio' name='typePolicy'
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>No vigente</label>
          </div>
          <div className='flex mb-1'>
            <Input type='radio' name='typePolicy'
              className="appearance-none w-4 h-4 p-0 mt-0.5 rounded-full border-darkBlue checked:bg-darkBlue checked:border-darkBlue cursor-pointer" />
            <label className='ml-2'>Cancelada</label>
          </div>

        </div>

        <div className='col-span-3'>
          <div className='grid grid-cols-4'>
            <Input className='col-span-3' placeholder='Ingrese el ID de la póliza'/>
            <Button
              className="text-center flex mx-6  bg-darkBlue">
              Buscar
            </Button>
          </div>


          <h4 className="text-alternGray mb-3 mt-6 ml-4 ">Mostrando 2 de 2 resultados</h4>
          <PolicyItem></PolicyItem>
          <PolicyItem></PolicyItem>

          <div className="flex items-center justify-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-800 disabled:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="border border-gray-300 rounded-lg flex items-center justify-center w-10 h-10">
              <p className="text-gray-800">1</p>
            </div>

            <button className="p-2 text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>

    </>
  )
}

export default PoliciesList