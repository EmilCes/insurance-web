import { Button } from '@/components/ui/button'
import React from 'react'

const PolicyDetails = async ({ params }: { params: { policyId: string } }) => {
    const id = (await params).policyId

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='col-span-2'>
                    <h2 className='text-2xl font-semibold'>Póliza con Plan Amplia Plus</h2>
                    <h3 className="text-alternGray font-semibold text-xl">Estado: <span className="text-lightBlue">Vigente</span></h3>
                </div>

                <Button
                    className="w-4/5 text-center flex justify-center mt-4 min-h-12 bg-darkBlue">
                    Descargar póliza
                </Button>
            </div>

            <div className='border-solid border border-slate-400 rounded-lg py-8 px-8 mt-6'>
                <div className='grid md:grid-cols-4 gap-2 md:gap-14 px-2'>
                    <div className='border-solid border-b border-slate-400 md:col-span-3 w-4/5 md:w-3/5'>
                        <p className='text-base text-alternGray text-center'>ID: <span className='text-lg text-black font-semibold'>{id}</span></p>
                    </div>
                    <div className='border-solid border-b border-slate-400 mx-2 w-1/3 md:w-auto'>
                        <p className='text-base text-alternGray text-center'>Plan: <span className='text-lg text-black font-semibold'>Amplia Plus</span></p>
                    </div>
                </div>

                <div className='bg-lighterBlue my-4 px-4 py-2 rounded-lg'>
                    <h2 className='text-white'>INFORMACIÓN DEL ASEGURADO</h2>
                </div>

                <div className='px-6 grid grid-cols-2 border-solid border-b border-slate-400 pb-4'>
                    <div className='border-solid border-r border-slate-400'>
                        <p className='text-alternGray mb-2'>Nombre: <span className='text-black font-semibold'>Jacob Montiel</span></p>
                        <p className='text-alternGray mb-2'>RFC: <span className='text-black font-semibold'>MOSJ16090223456</span></p>
                        <p className='text-alternGray'>Código postal: <span className='text-black font-semibold'>91020</span></p>
                    </div>

                    <div className='pl-6'>
                        <p className='text-alternGray mb-2'>Domicilio: <span className='text-black font-semibold'>Av. Manuel Ávila Camacho No.2</span></p>
                        <p className='text-alternGray mb-2'>Estado: <span className='text-black font-semibold'>Veracruz</span></p>
                        <p className='text-alternGray'>Municipio: <span className='text-black font-semibold'>Xalapa</span></p>
                    </div>
                </div>

                <div className='bg-lighterBlue my-4 px-4 py-2 rounded-lg'>
                    <h2 className='text-white'>DESCRIPCIÓN DEL VEHÍCULO ASEGURADO</h2>
                </div>

                <div className='px-6 grid grid-cols-2 border-solid border-b border-slate-400 pb-4'>
                    <div className='border-solid border-r border-slate-400'>
                        <p className='text-alternGray mb-2'>Marca: <span className='text-black font-semibold'>Nissan</span></p>
                        <p className='text-alternGray mb-2'>Modelo: <span className='text-black font-semibold'>2018</span></p>
                        <p className='text-alternGray'>Serie: <span className='text-black font-semibold'>DA&56789</span></p>
                    </div>

                    <div className='pl-6'>
                        <p className='text-alternGray mb-2'>Placas: <span className='text-black font-semibold'>AAA-01-1</span></p>
                        <p className='text-alternGray mb-2'>Color: <span className='text-black font-semibold'>Rojo</span></p>
                        <p className='text-alternGray'>Tipo Automóvil: <span className='text-black font-semibold'>Automóvil importado</span></p>
                    </div>
                </div>

                <div className='mt-4 px-6 grid grid-cols-2 border-solid border-b border-slate-400 pb-4'>
                    <div className='border-solid border-r border-slate-400'>
                        <p className='text-alternGray mb-2'>Vigencia de póliza:</p>
                        <p className='font-semibold'>Desde las 12:00 P.M. del 28/DIC/2024</p>
                        <p className='font-semibold'>Desde las 12:00 P.M. del 28/DIC/2025</p>
                    </div>

                    <div className='pl-6 my-auto'>
                        <p className='text-alternGray mb-2'>Ocupantes: <span className='text-black font-semibold'>5</span></p>
                        <p className='text-alternGray'>Servicio: <span className='text-black font-semibold'>Particular</span></p>
                    </div>
                </div>

                <div className='bg-lighterBlue my-4 px-4 py-2 rounded-lg flex'>
                    <h2 className='text-white'>SERVICIOS INCLUIDOS</h2>
                    <h2 className='text-white ml-auto mr-2'>SUMA ASEGURADA</h2>
                </div>

                <div className='px-6 mt-4 border-solid border-b pb-2 border-slate-400
                    grid grid-cols-2 gap-1'>
                    <p className='font-semibold'>Daños asegurados</p>
                    <p className='font-semibold ml-auto mr-2'>$105,000.00</p>
                    <p className='font-semibold'>Robo total</p>
                    <p className='font-semibold ml-auto mr-2'>$105,000.00</p>
                    <p className='font-semibold'>Gastos legales</p>
                    <p className='font-semibold ml-auto mr-2'>AMPARADA</p>
                    <p className='font-semibold'>Gastos Médicos Ocupantes</p>
                    <p className='font-semibold ml-auto mr-2'>$305,000.00</p>
                </div>

                <div className='grid md:grid-cols-2'>
                    <div className='border-solid border-r border-slate-400 pr-4 mt-2 pb-4'>
                        <div className='bg-lighterBlue my-2 px-4 py-2 rounded-lg'>
                            <h2 className='text-white'>TOTAL</h2>
                        </div>
                        <p className='font-semibold text-alternGray mb-2'>Pago de la póliza cada: <span className='text-black'>4 meses</span></p>

                        <div className='flex mb-1'>
                            <p className='text-alternGray'>Costo de la póliza base</p>
                            <p className='font-semibold ml-auto mr-2'>$5,000.00</p>
                        </div>
                        <div className='flex mb-2'>
                            <p className='text-alternGray'>Tiempo de validez de la póliza</p>
                            <p className='font-semibold ml-auto mr-2'>3 años</p>
                        </div>
                        <div className='flex mb-1 pt-2 border-solid border-t border-slate-400'>
                            <p className='text-alternGray font-semibold'>Costo total</p>
                            <p className='font-semibold ml-auto mr-2'>$15,000.00</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className='text-center text-alternGray text-xl font-semibold'>Consultado el 25 de diciembre del 2024</h2>
                        <h4 className='text-center text-alternGray text-lg'>Veracruz, Veracruz</h4>
                    </div>
                </div>

            </div>

            <div className='grid grid-cols-1 md:grid-cols-3'>
                <Button
                    className="w-4/5 text-center flex justify-center mt-4 min-h-12 bg-red-950 col-start-3">
                    Cancelar póliza
                </Button>
            </div>



        </>


    )
}

export default PolicyDetails