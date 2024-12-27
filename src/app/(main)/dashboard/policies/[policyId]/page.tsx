"use client"

import { getPolicyDetails, PolicyDetails } from '@/api/policy.api'
import Loading from '@/components/loading/Loading';
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import PolicyDetailsPage from './policydetails';

const PolicyPage = () => {
    const router = useRouter();
    const params = useParams();
    const [policyData, setPolicyData] = useState<PolicyDetails>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    if (!params || params.policyId == null) {
        router.push("/dashboard/policies");
    }
    const idPolicyQuery = params.policyId;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (idPolicyQuery == undefined) {
                    return;
                }

                const policyDataResponse = await getPolicyDetails(idPolicyQuery);
                if (policyDataResponse) {
                    setPolicyData(policyDataResponse);
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        fetchDetails();
    }, []);

    return (
        <>
            {isLoading ?
                (<Loading></Loading>) :
                policyData ? (<PolicyDetailsPage policyData={policyData}></PolicyDetailsPage>) : <></>}
        </>
    )
}

export default PolicyPage