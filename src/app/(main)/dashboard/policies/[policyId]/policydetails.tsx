"use client"

import { PolicyDetails } from '@/api/policy.api'
import Loading from '@/components/loading/Loading'
import { Button } from '@/components/ui/button'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import React, { useState } from 'react'
import CancelPolicy from './cancelpolicy'
import BreadcrumbPoliciesPage from '../breadcrumbPolicies'

const PolicyDetailsPage = ({ policyData }: { policyData: PolicyDetails }) => {
    const [showCancelPolicy, setShowCancelPolicy] = useState<boolean>(false);

    const startDate = new Date(policyData?.startDate);
    const endDate = new Date(startDate);
    endDate.setFullYear(startDate.getFullYear() + policyData?.yearsPolicy);

    const isPolicyActive = new Date() < endDate;

    return (
        <>
            <BreadcrumbPoliciesPage id={policyData.serialNumber}></BreadcrumbPoliciesPage>
            <div className="mx-auto w-full max-w-screen-lg px-8 pb-8 pt-4">
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    <div className='col-span-2'>
                        <h2 className='text-2xl font-semibold'>Póliza con Plan {policyData?.planTitle}</h2>
                        <h3 className="text-alternGray font-semibold text-xl">Estado:
                            <span className="text-lightBlue"> {!policyData?.isCanceled ? (isPolicyActive ? "Vigente" : "Expirada") : "Cancelada"}</span>
                        </h3>
                    </div>

                    <Button
                        className="w-4/5 text-center flex justify-center mt-4 min-h-12 bg-darkBlue">
                        Descargar póliza
                    </Button>
                </div>

                <div className='border-solid border border-slate-400 rounded-lg py-8 px-8 mt-6'>
                    <div className='grid md:grid-cols-4 gap-2 md:gap-14 px-2'>
                        <div className='border-solid border-b border-slate-400 md:col-span-3 w-4/5 md:w-3/5'>
                            <p className='text-base text-alternGray text-center'>ID: <span className='text-lg text-black font-semibold'>{policyData?.serialNumber}</span></p>
                        </div>
                        <div className='border-solid border-b border-slate-400 mx-2 w-1/3 md:w-auto'>
                            <p className='text-base text-alternGray text-center'>Plan: <span className='text-lg text-black font-semibold'>{policyData?.planTitle}</span></p>
                        </div>
                    </div>

                    <div className='bg-lighterBlue my-4 px-4 py-2 rounded-lg'>
                        <h2 className='text-white'>INFORMACIÓN DEL ASEGURADO</h2>
                    </div>

                    <div className='px-6 grid grid-cols-2 border-solid border-b border-slate-400 pb-4'>
                        <div className='border-solid border-r border-slate-400'>
                            <p className='text-alternGray mb-2'>Nombre: <span className='text-black font-semibold'>{policyData?.Driver?.Account?.name}</span></p>
                            <p className='text-alternGray mb-2'>RFC: <span className='text-black font-semibold'>{policyData?.Driver?.rfc}</span></p>
                            <p className='text-alternGray'>Código postal: <span className='text-black font-semibold'>{policyData?.Driver?.Account?.postalCode}</span></p>
                        </div>

                        <div className='pl-6'>
                            <p className='text-alternGray mb-2'>Domicilio: <span className='text-black font-semibold'>{policyData?.Driver?.Account?.address}</span></p>
                            <p className='text-alternGray mb-2'>Estado: <span className='text-black font-semibold'>{policyData?.Driver?.Account?.Municipality?.State?.stateName}</span></p>
                            <p className='text-alternGray'>Municipio: <span className='text-black font-semibold'>{policyData?.Driver?.Account?.Municipality?.municipalityName}</span></p>
                        </div>
                    </div>

                    <div className='bg-lighterBlue my-4 px-4 py-2 rounded-lg'>
                        <h2 className='text-white'>DESCRIPCIÓN DEL VEHÍCULO ASEGURADO</h2>
                    </div>

                    <div className='px-6 grid grid-cols-2 border-solid border-b border-slate-400 pb-4'>
                        <div className='border-solid border-r border-slate-400'>
                            <p className='text-alternGray mb-2'>Marca: <span className='text-black font-semibold'>{policyData?.Vehicle?.Model?.Brand?.name}</span></p>
                            <p className='text-alternGray mb-2'>Modelo: <span className='text-black font-semibold'>{policyData?.Vehicle?.Model?.year}</span></p>
                            <p className='text-alternGray'>Serie: <span className='text-black font-semibold'>{policyData?.Vehicle?.serialNumberVehicle}</span></p>
                        </div>

                        <div className='pl-6'>
                            <p className='text-alternGray mb-2'>Placas: <span className='text-black font-semibold'>{policyData?.Vehicle?.plates}</span></p>
                            <p className='text-alternGray mb-2'>Color: <span className='text-black font-semibold'>{policyData?.Vehicle?.Color?.vehicleColor}</span></p>
                            <p className='text-alternGray'>Tipo Automóvil: <span className='text-black font-semibold'>{policyData?.Vehicle?.Type?.vehicleType}</span></p>
                        </div>
                    </div>

                    <div className='mt-4 px-6 grid grid-cols-2 border-solid border-b border-slate-400 pb-4'>
                        <div className='border-solid border-r border-slate-400'>
                            <p className='text-alternGray mb-2'>Vigencia de póliza:</p>
                            <p className='font-semibold'>Desde el {startDate.getDate()} de {startDate.toLocaleString('es', { month: 'long' })} del {startDate.getFullYear()}</p>
                            <p className='font-semibold'>Desde el {endDate.getDate()} de {endDate.toLocaleString('es', { month: 'long' })} del {endDate.getFullYear()}</p>
                        </div>

                        <div className='pl-6 my-auto'>
                            <p className='text-alternGray mb-2'>Ocupantes: <span className='text-black font-semibold'>{policyData?.Vehicle?.occupants}</span></p>
                            <p className='text-alternGray'>Servicio: <span className='text-black font-semibold'>{policyData?.Vehicle?.ServiceVehicle?.name}</span></p>
                        </div>
                    </div>

                    <div className='bg-lighterBlue my-4 px-4 py-2 rounded-lg flex'>
                        <h2 className='text-white'>SERVICIOS INCLUIDOS</h2>
                        <h2 className='text-white ml-auto mr-2'>SUMA ASEGURADA</h2>
                    </div>

                    <div className='px-6 mt-4 border-solid border-b pb-2 border-slate-400
                    grid grid-cols-2 gap-1'>
                        {policyData?.PolicyService.map((service) => (
                            <>
                                <p className='font-semibold'>{service.name}</p>
                                <p className='font-semibold ml-auto mr-2'>{service.isCovered ? "AMPARADA" : "$" + new Intl.NumberFormat("en-US").format(+service.coveredCost)}</p>
                            </>
                        ))}
                    </div>

                    <div className='grid md:grid-cols-2'>
                        <div className='border-solid border-r border-slate-400 pr-4 mt-2 pb-4'>
                            <div className='bg-lighterBlue my-2 px-4 py-2 rounded-lg'>
                                <h2 className='text-white'>TOTAL</h2>
                            </div>

                            <div className='px-6'>
                                <p className='font-semibold text-alternGray mb-2'>Pago de la póliza cada: <span className='text-black'>{policyData?.monthsOfPayment} meses</span></p>

                                <div className='flex mb-1'>
                                    <p className='text-alternGray'>Costo de la póliza base</p>
                                    <p className='font-semibold ml-auto mr-2'>${new Intl.NumberFormat("en-US").format(+(policyData?.coveredCost ? policyData?.coveredCost : 1) / +(policyData?.yearsPolicy ? policyData?.yearsPolicy : 1))}</p>
                                </div>
                                <div className='flex mb-2'>
                                    <p className='text-alternGray'>Tiempo de validez de la póliza</p>
                                    <p className='font-semibold ml-auto mr-2'>{policyData?.yearsPolicy} años</p>
                                </div>
                                <div className='flex mb-1 pt-2 border-solid border-t border-slate-400'>
                                    <p className='text-alternGray font-semibold'>Costo total</p>
                                    <p className='font-semibold ml-auto mr-2'>${new Intl.NumberFormat("en-US").format(+(policyData?.coveredCost ? policyData?.coveredCost : "0"))}</p>
                                </div>
                            </div>

                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h2 className='text-center text-alternGray text-xl font-semibold'>Consultado el {new Date().getDate()} de {new Date().toLocaleString('es', { month: 'long' })} del {new Date().toLocaleString('es', { year: 'numeric' })}</h2>
                            <h4 className='text-center text-alternGray text-lg'>{policyData?.Driver?.Account?.Municipality?.municipalityName}, {policyData?.Driver?.Account?.Municipality?.State?.stateName}</h4>
                        </div>
                    </div>

                </div>

                {policyData.isCanceled ? (<></>) : (<>
                    <div className='grid grid-cols-1 md:grid-cols-3'>
                        <Button
                            className="w-4/5 text-center flex justify-center mt-4 min-h-12 bg-red-950 col-start-3"
                            onClick={() => setShowCancelPolicy(true)}>
                            Cancelar póliza
                        </Button>
                    </div></>)}
                {showCancelPolicy ? (<CancelPolicy idPolicy={policyData.serialNumber}
                    closeMessage={() => { setShowCancelPolicy(false) }}
                ></CancelPolicy>) : (<></>)}
            </div>
        </>
    )
}

export default PolicyDetailsPage