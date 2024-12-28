import { BrandModelItem, BrandVehicleItem } from '@/api/policyplan.api'
import React from 'react'

const Vehicledata = ({ brandModel }: { brandModel: BrandModelItem | undefined }) => {
    console.log(brandModel);
    return (
        <>
            <h3 className='text-xl font-semibold'>Vehículo asegurado</h3>
            <h4 className="text-alternGray mb-2">Datos del vehículo que abarcará la póliza</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-neutral-100 border-solid border rounded-md border-stone-300 px-6 py-1'>
                    <label className='font-light text-slate-700'>Marca</label>
                    <p className='font-bold'>{brandModel?.name}</p>
                </div>
                <div className='bg-neutral-100 border-solid border rounded-md border-stone-300 px-6 py-1'>
                    <label className='font-light text-slate-700'>Modelo</label>
                    <p className='font-bold'>{brandModel?.year}</p>
                </div>
            </div>

        </>
    )
}

export default Vehicledata