"use client"

import React, { useEffect, useState } from 'react'
import { FormPolicyProvider, useFormPolicyContext } from "@/lib/context/formPolicyContext";
import SelectionPlanForm from '@/components/forms/selectionPlan.form';

import Loading from '@/components/loading/Loading';
import { useRouter } from 'next/navigation';
import isAuth from '@/lib/auth/isAuth';

const SelectionPlan = () => {
    const { formPolicyData, setFormPolicyData } = useFormPolicyContext();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!(formPolicyData?.idBrand && formPolicyData?.idModel && formPolicyData?.series && formPolicyData?.idColor
            && formPolicyData?.plates && formPolicyData?.idType && formPolicyData?.occupants && formPolicyData?.idService)) {
            router.push("/dashboard/policyPlan/");
        } else {
            setIsLoading(false);
        }
    }, [formPolicyData]);

    return (
        <>
            {isLoading ? <Loading /> : <SelectionPlanForm />}
        </>
    )
}

export default isAuth(SelectionPlan)