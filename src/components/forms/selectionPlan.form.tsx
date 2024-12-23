"use client"

import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { BrandVehicleItem, getBrandModelData, getPolicyPlans, PolicyPlansResponse } from '@/api/policyplan.api';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import planPolicySchema from '@/schemas/planPolicy.schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/components/loading/Loading';
import { Input } from '@/components/ui/input';
import { FormPolicyProvider, useFormPolicyContext } from "@/lib/context/formPolicyContext";
import Vehicledata from '@/app/(main)/dashboard/policyPlan/vehicledata';

const SelectionPlanForm = () => {
    const { formPolicyData, setFormPolicyData } = useFormPolicyContext();
    const router = useRouter();

    const [policyPlans, setPolicyPlans] = useState<PolicyPlansResponse>([]);
    const [brandModel, setBrandModel] = useState<BrandVehicleItem>();
    const [yearsPolicy, setYearsPolicy] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof planPolicySchema>>({
        resolver: zodResolver(planPolicySchema),
        defaultValues: {
            yearPolicy: 1
        }
    });

    useEffect(() => {
        setIsLoading(true);
        const fetchPlans = async () => {
            try {
                const idModelData = formPolicyData && formPolicyData.idModel ? formPolicyData.idModel : 0;
                if(!formPolicyData?.idModel){
                   throw new Error("Error al recuperar el modelo");
                }

                const brandModel = await getBrandModelData(idModelData);
                if(brandModel){
                    setBrandModel(brandModel);
                }

                const policyPlansData = await getPolicyPlans();
                if (policyPlansData) {
                    setPolicyPlans(policyPlansData);
                }

            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
            setIsLoading(false);
        };
        fetchPlans();
    }, []);

    const onTimeValueChanged = (value: number) => {
        setYearsPolicy(value);
    }

    const onIdPolicyPlanChanged = (value: string) => {
        form.setValue("idPolicyPlan", value);
    }

    async function onSubmit(values: z.infer<typeof planPolicySchema>) {
        try {
            setFormPolicyData({ 
                idPolicyPlan: values.idPolicyPlan, 
                yearOfPolicy: values.yearPolicy
              });
      
            console.log(values)
            router.push('/dashboard/policyPlan/confirmation');
        } catch (error: any) {
            console.log(error);
        }
    }
    return (
        <>
            <div>
                {isLoading && <Loading />}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 mb-4'>
                        <div className='mb-4'>
                            <h2 className='text-2xl font-semibold'>Selección del plan de la póliza</h2>
                            <h4 className="text-alternGray mb-4">Seleccione un plan de póliza y la duración de esta para continuar</h4>


                            <FormField
                                control={form.control}
                                name="yearPolicy"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duración de la póliza</FormLabel>
                                        <Select defaultValue="1" onValueChange={(value) => { field.onChange(value); onTimeValueChanged(+value) }}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona tipo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 año</SelectItem>
                                                <SelectItem value="2">2 años</SelectItem>
                                                <SelectItem value="3">3 años</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                        </div>

                        <div className='border-solid border rounded-lg border-stone-300 py-4 px-8 my-auto'>
                            <Vehicledata brandModel={brandModel}/>
                        </div>

                    </div>


                    <div className='mb-4'>
                        <h3 className='text-1xl font-semibold mt-4'>Planes disponibles</h3>
                        <h4 className="text-alternGray">El precio de cada póliza es de acuerdo a la duración seleccionada</h4>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                        {policyPlans.map((plan) => (
                            <div className='border-solid border rounded-lg border-stone-300 py-6 px-8'>
                                <h2 className='text-2xl font-semibold mb-4'>{plan.title}</h2>
                                <p className="text-alternGray mb-8">{plan.description}</p>

                                <div className='grid grid-cols-1 md:grid-cols-2'>
                                    <p className='text-2xl font-semibold text-slate-800 mt-auto'>
                                        Total <span className='text-darkBlue'>${new Intl.NumberFormat("en-US").format(plan.basePrice * yearsPolicy)}</span>
                                    </p>
                                    <Input
                                        name="idPolicyPlan"
                                        type='radio'
                                        className="mt-auto ml-auto appearance-none w-8 h-8 border-darkBlue rounded-full checked:bg-darkBlue checked:border-darkBlue cursor-pointer"
                                        onChange={() => onIdPolicyPlanChanged(plan.idPolicyPlan)}
                                    />

                                </div>

                            </div>
                        ))}

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <br className="hidden md:block" />
                        <div className='flex justify-center'>
                            <Button
                                type="submit"
                                className="w-4/5 text-center flex justify-center mt-4 min-h-12 bg-darkBlue">
                                Continuar
                            </Button>
                        </div>

                    </div>
                </form>
            </Form>
        </>
    )
}

export default SelectionPlanForm