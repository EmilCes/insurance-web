"use client"

import PaymentForm from '@/components/forms/payment.form'
import React, { useEffect, useState } from 'react'
import Vehicledata from '../vehicledata'
import { useRouter } from "next/navigation";
import { getPolicyPlanData, PolicyPlanItem } from '@/api/policyplan.api';
import Loading from '@/components/loading/Loading';

const Confirmation = () => {
    const [policyPlan, setPolicyPlan] = useState<PolicyPlanItem>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchPlans = async () => {
            try {
                const policyPlanData = await getPolicyPlanData("3beb7813-510b-45af-870d-245b2d5251df");
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
            <div>
                {isLoading && <Loading />}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <PaymentForm policyPlan={policyPlan}/>

                <div>
                    <h2 className='text-2xl font-semibold mb-2'>Resumen de póliza</h2>
                    <div className='border-solid border rounded-lg border-stone-300 py-6 px-8 my-auto'>
                        <div className='mb-6'>
                            {/*<Vehicledata brandModel={}/>*/}
                        </div>
                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 mb-2'>
                                <h3 className='text-xl font-semibold my-auto'>Plan {policyPlan?.title}</h3>
                                <h6 className='text-alternGray ml-auto text-right'>La duración de la póliza será de 2 años</h6>
                            </div>

                            <h4 className="text-alternGray">{policyPlan?.description}</h4>

                            <h3 className='text-xl font-semibold my-auto mt-4'>
                                Total <span className='text-darkBlue'>${new Intl.NumberFormat("en-US").format((policyPlan) ? policyPlan.basePrice : "0")}</span></h3>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Confirmation