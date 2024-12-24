"use client"

import PaymentForm from '@/components/forms/payment.form'
import React, { useEffect, useState } from 'react'
import Vehicledata from '../vehicledata'
import { useRouter } from "next/navigation";
import { BrandVehicleItem, getBrandModelData, getPolicyPlanData, PolicyPlanItem } from '@/api/policyplan.api';
import Loading from '@/components/loading/Loading';
import { useFormPolicyContext } from '@/lib/context/formPolicyContext';

const Confirmation = () => {
    const { formPolicyData, setFormPolicyData } = useFormPolicyContext();
    const [policyPlan, setPolicyPlan] = useState<PolicyPlanItem>();
    const [brandModel, setBrandModel] = useState<BrandVehicleItem>();
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (!(formPolicyData?.idBrand && formPolicyData?.idModel && formPolicyData?.series && formPolicyData?.idColor
            && formPolicyData?.plates && formPolicyData?.idType && formPolicyData?.occupants && formPolicyData?.idService
            && formPolicyData?.yearOfPolicy && formPolicyData?.idPolicyPlan
        )) {
            router.push("/dashboard/policyPlan/");
        }
    }, [formPolicyData]);


    useEffect(() => {
        setIsLoading(true);
        const fetchPlans = async () => {
            try {
                const idPolicyPlan = formPolicyData && formPolicyData.idPolicyPlan ? formPolicyData.idPolicyPlan : "";
                if (!formPolicyData?.idPolicyPlan) {
                    throw new Error("Error al recuperar el plan de poliza");
                }

                const idModelData = formPolicyData && formPolicyData.idModel ? formPolicyData.idModel : 0;
                if (!formPolicyData?.idModel) {
                    throw new Error("Error al recuperar el modelo");
                }

                const brandModel = await getBrandModelData(idModelData);
                if (brandModel) {
                    setBrandModel(brandModel);
                }

                const policyPlanData = await getPolicyPlanData(idPolicyPlan);
                if (policyPlanData) {
                    setPolicyPlan(policyPlanData);
                }
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
            setIsLoading(false);
        };
        fetchPlans();
    }, []);

    return (
        <div>
            {isLoading ? <Loading /> :
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                        <PaymentForm policyPlan={policyPlan} />

                        <div>
                            <h2 className='text-2xl font-semibold mb-2'>Resumen de póliza</h2>
                            <div className='border-solid border rounded-lg border-stone-300 py-6 px-8 my-auto'>
                                <div className='mb-6'>
                                    <Vehicledata brandModel={brandModel} />
                                </div>
                                <div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 mb-2'>
                                        <h3 className='text-xl font-semibold my-auto'>{policyPlan?.title}</h3>
                                        <h6 className='text-alternGray ml-auto text-right'>La duración de la póliza será de {formPolicyData.yearOfPolicy} años</h6>
                                    </div>

                                    <h4 className="text-alternGray">{policyPlan?.description}</h4>

                                    <h3 className='text-xl font-semibold my-auto mt-4'>
                                        Total <span className='text-darkBlue'>${new Intl.NumberFormat("en-US").format((policyPlan) ? policyPlan.basePrice : "0")}</span></h3>

                                </div>
                            </div>
                        </div>


                    </div>
                </>}
        </div>
    )
}

export default Confirmation