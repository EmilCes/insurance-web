"use client"

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
import { useRouter } from "next/navigation";
import Vehicledata from '../vehicledata';

const SelectionPlan = () => {

    const router = useRouter();

    async function onSubmit() {
        try {
            router.push('/dashboard/policyPlan/confirmation');
        } catch (error: any) {
            console.log(error);
        }
    }

    const plans = [{ title: "Plan Amplia Plus", description: "Cubre la Responsabilidad Civil, Asistencia Legal, Gastos médicos a ocupantes, Robo Total, Daños Materiales y otras coberturas y beneficios adicionales", total: 17234, id: 1 },
    { title: "Plan Amplia", description: "Cubre la Responsabilidad Civil, Asistencia Legal, Gastos médicos a ocupantes, Robo Total y Daños Materiales", total: 15231, id: 2 },
    { title: "Plan Limitada", description: "Cubre la Responsabilidad Civil, Asistencia Legal, Gastos médicos a ocupantes y Robo Total", total: 12231, id: 3 },
    { title: "Plan Responsabilidad Civil", description: "Cubre la Responsabilidad Civil, Asistencia Legal y Gastos médicos a ocupantes", total: 10231, id: 4 }]

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 mb-4'>
                <div className='mb-4'>
                    <h2 className='text-2xl font-semibold'>Selección del plan de la póliza</h2>
                    <h4 className="text-alternGray mb-4">Seleccione un plan de póliza y la duración de esta para continuar</h4>

                    <label className='text-[0.8rem] text-muted-foreground'>Duración</label>
                    <Select defaultValue="light">
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">1 año</SelectItem>
                            <SelectItem value="dark">2 años</SelectItem>
                            <SelectItem value="system">3 años</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='border-solid border rounded-lg border-stone-300 py-4 px-8 my-auto'>
                    <Vehicledata />
                </div>

            </div>


            <div className='mb-4'>
                <h3 className='text-1xl font-semibold mt-4'>Planes disponibles</h3>
                <h4 className="text-alternGray">El precio de cada póliza es de acuerdo a la duración seleccionada</h4>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                {plans.map((plan) => (
                    <div className='border-solid border rounded-lg border-stone-300 py-6 px-8'>
                        <h2 className='text-2xl font-semibold mb-4'>{plan.title}</h2>
                        <p className="text-alternGray mb-8">{plan.description}</p>

                        <div className='grid grid-cols-1 md:grid-cols-2'>
                            <p className='text-2xl font-semibold text-slate-800 mt-auto'>
                                Total <span className='text-darkBlue'>${new Intl.NumberFormat("en-US").format(plan.total)}</span>
                            </p>
                            <input
                                type="radio"
                                name="plan"
                                className="mt-auto ml-auto appearance-none w-6 h-6 border-2 border-darkBlue rounded-full checked:bg-darkBlue checked:border-darkBlue cursor-pointer"
                            />
                        </div>

                    </div>
                ))}

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <br className="hidden md:block" />
                <div className='flex justify-center'>
                    <Button onClick={onSubmit}
                        className="w-4/5 text-center flex justify-center mt-4 min-h-12 bg-darkBlue">
                        Continuar
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default SelectionPlan