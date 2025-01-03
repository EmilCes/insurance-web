"use client"

import React, { useEffect, useState } from 'react'
import { FormPolicyProvider, useFormPolicyContext } from "@/lib/context/formPolicyContext";
import SelectionPlanForm from '@/components/forms/selectionPlan.form';

import Loading from '@/components/loading/Loading';
import { useRouter } from 'next/navigation';
import isAuth from '@/lib/auth/isAuth';
import { useStatusPageContext } from '@/lib/statusPage/statusContext';
import ErrorMessage from '@/components/errorMessage/errorMessage';
import isCorrectRole from '@/lib/auth/isCorrectRole';

const SelectionPlan = () => {
    const { formPolicyData } = useFormPolicyContext();
    const { isLoading, showMessageError, setIsLoading } = useStatusPageContext();
    const router = useRouter();

    useEffect(() => {
        if (!(formPolicyData?.idBrand && formPolicyData?.idModel && formPolicyData?.series && formPolicyData?.idColor
            && formPolicyData?.plates && formPolicyData?.idType && formPolicyData?.occupants && formPolicyData?.idService)) {
            router.push("/dashboard/policyPlan/");
            setIsLoading(false);
        }
    }, [formPolicyData]);

    return (
        <>
            {isLoading ? (<Loading></Loading>) : (<></>)}
            {showMessageError ? (<ErrorMessage></ErrorMessage>) : (<></>)}
            <SelectionPlanForm />
        </>
    )
}

export default isAuth(isCorrectRole(SelectionPlan, "Conductor"))