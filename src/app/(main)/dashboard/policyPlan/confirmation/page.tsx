"use client"

import PaymentForm from '@/components/forms/payment.form'
import React, { useEffect, useState } from 'react'
import Vehicledata from '../vehicledata'
import { useRouter } from "next/navigation";
import { BrandModelItem, CreatePolicyResponse, getBrandModelData, getPolicyPlanData, PolicyPlanItem } from '@/api/policyplan.api';
import Loading from '@/components/loading/Loading';
import { useFormPolicyContext } from '@/lib/context/formPolicyContext';
import ProgressInPolicyForm from '../progresspolicyform';
import PaymentPolicySuccesful from './paymentsuccesful';

const Confirmation = () => {
    const { formPolicyData, setFormPolicyData } = useFormPolicyContext();
    const [policyPlan, setPolicyPlan] = useState<PolicyPlanItem>();
    const [brandModel, setBrandModel] = useState<BrandModelItem>();
    const [newPolicy, setNewPolicy] = useState<CreatePolicyResponse>();
    const [isLoading, setIsLoading] = useState(true);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!(formPolicyData?.idBrand && formPolicyData?.idModel && formPolicyData?.series && formPolicyData?.idColor
            && formPolicyData?.plates && formPolicyData?.idType && formPolicyData?.occupants && formPolicyData?.idService
            && formPolicyData?.yearOfPolicy && formPolicyData?.idPolicyPlan
        )) {
            router.push("/dashboard/policyPlan/");
        }
    }, []);


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

    const handlePaymentSuccess = (newPolicy : CreatePolicyResponse) => {
        setIsPaymentSuccessful(true);
        setNewPolicy(newPolicy);
    };

    return (
        <div>
            {isPaymentSuccessful ? (
                <>
                <PaymentPolicySuccesful newPolicy={newPolicy}></PaymentPolicySuccesful>
                </>) : (<>
                    {isLoading ? <Loading /> :
                        <>
                            <ProgressInPolicyForm currentStep={3}></ProgressInPolicyForm>
                            <div className="mx-auto w-full max-w-screen-lg px-8 pb-8 pt-4">

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-4'>
                                    <PaymentForm policyPlan={policyPlan} onPaymentSuccess={handlePaymentSuccess} />

                                    <div>
                                        <h2 className='text-2xl font-semibold mb-2'>Resumen de póliza</h2>
                                        <div className='border-solid border rounded-lg border-stone-300 py-6 px-8 my-auto'>
                                            <div className='mb-6'>
                                                <Vehicledata brandModel={brandModel} />
                                            </div>
                                            <div>
                                                <div className='grid grid-cols-1 md:grid-cols-2 mb-2'>
                                                    <h3 className='text-xl font-semibold my-auto'>Plan {policyPlan?.title}</h3>
                                                    <h6 className='text-alternGray ml-auto text-right'>La duración de la póliza será de {formPolicyData.yearOfPolicy} años</h6>
                                                </div>

                                                <h4 className="text-alternGray">{policyPlan?.description}</h4>

                                                <div className="overflow-x-auto mt-2">
                                                    <table className="min-w-full border-collapse border border-gray-300">
                                                        <thead>
                                                            <tr className="bg-gray-100">
                                                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                                                    Coberturas contratadas
                                                                </th>
                                                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                                                    Suma asegurada
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {policyPlan?.Service.map((service, index) => (
                                                                <tr
                                                                    key={index}
                                                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                                                >
                                                                    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                                                                        {service.name}
                                                                    </td>
                                                                    {!service.isCovered ?
                                                                        (<td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                                                                            ${new Intl.NumberFormat("en-US").format(service.coveredCost)}
                                                                        </td>)
                                                                        :
                                                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">
                                                                            Amparado
                                                                        </td>}

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>


                                                <h3 className='text-xl font-semibold my-auto mt-4'>
                                                    Total <span className='text-darkBlue'>${new Intl.NumberFormat("en-US").format((policyPlan && formPolicyData.yearOfPolicy) ? policyPlan.basePrice * formPolicyData.yearOfPolicy : "0")}</span></h3>

                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </>}
                </>)}
        </div>
    )
}

export default Confirmation