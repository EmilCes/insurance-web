"use client"

import PaymentForm from '@/components/forms/payment.form'
import React, { useEffect, useState } from 'react'
import Vehicledata from '../vehicledata'
import { useRouter } from "next/navigation";
import { getPolicyPlanData, PolicyPlanItem } from '@/api/policyplan.api';
import Loading from '@/components/loading/Loading';
import { useFormPolicyContext } from '@/lib/context/formPolicyContext';
import ProgressInPolicyForm from '../progresspolicyform';
import PaymentPolicySuccesful from './paymentsuccesful';
import isAuth from '@/lib/auth/isAuth';
import { useStatusPageContext } from '@/lib/statusPage/statusContext';
import ErrorMessage from '@/components/errorMessage/errorMessage';
import { BrandModelItem, getBrandModelData } from '@/api/brand.api';
import { CreatePolicyResponse } from '@/api/policy.api';
import { getBankNumberUser, UserBankAccountResponse } from '@/api/user.api';
import isCorrectRole from '@/lib/auth/isCorrectRole';

const Confirmation = () => {
    const { formPolicyData } = useFormPolicyContext();
    const { isLoading, showMessageError, setShowMessageError, setIsLoading } = useStatusPageContext();

    const [policyPlan, setPolicyPlan] = useState<PolicyPlanItem>();
    const [brandModel, setBrandModel] = useState<BrandModelItem>();
    const [accountInfo, setAccountInfo] = useState<UserBankAccountResponse>();
    const [newPolicy, setNewPolicy] = useState<CreatePolicyResponse>();
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!(formPolicyData?.idBrand && formPolicyData?.idModel && formPolicyData?.series && formPolicyData?.idColor
            && formPolicyData?.plates && formPolicyData?.idType && formPolicyData?.occupants && formPolicyData?.idService
            && formPolicyData?.yearOfPolicy && formPolicyData?.idPolicyPlan
        )) {
            router.push("/dashboard/policyPlan/");
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
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

                const accountInfoData = await getBankNumberUser();
                if (accountInfoData != null) {
                    setAccountInfo(accountInfoData);
                } else {
                    throw new Error("Error al recuperar datos usuario");
                }

                const brandModel = await getBrandModelData(idModelData);
                if (brandModel) {
                    setBrandModel(brandModel);
                } else {
                    throw new Error("Error al recuperar la marca");
                }

                const policyPlanData = await getPolicyPlanData(idPolicyPlan);
                if (policyPlanData) {
                    setPolicyPlan(policyPlanData);
                } else {
                    throw new Error("Error al recuperar el plan de póliza");
                }
                if (showMessageError) {
                    setShowMessageError(false);
                }
            } catch (error) {
                setShowMessageError(true);
            }
            setIsLoading(false);
        };
        fetchPlans();
    }, []);

    const handlePaymentSuccess = (newPolicy: CreatePolicyResponse) => {
        setIsPaymentSuccessful(true);
        setIsLoading(false);
        setNewPolicy(newPolicy);
    };

    return (
        <div>
            {isLoading ? (<Loading></Loading>) : (<></>)}

            {isPaymentSuccessful ? (
                <>
                    <PaymentPolicySuccesful newPolicy={newPolicy}></PaymentPolicySuccesful>
                </>) :
                (<>
                    <ProgressInPolicyForm currentStep={3}></ProgressInPolicyForm>
                    <div className="mx-auto w-full max-w-screen-lg px-8 pb-8 pt-4">

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-4'>
                            <div>
                                <PaymentForm policyPlan={policyPlan} onPaymentSuccess={handlePaymentSuccess} accountInfo={accountInfo} />
                                {showMessageError ? (<p className='text-red-600'>Ocurrió un error, por favor vuelva a intentar</p>) : (<></>)}
                            </div>


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
                </>
                )}
        </div>
    )
}

export default isAuth(isCorrectRole(Confirmation, "Conductor"))