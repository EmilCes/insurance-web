"use client"

import { getPolicyDetails, PolicyDetails, PolicyDetailsErrorResponse } from '@/api/policy.api'
import Loading from '@/components/loading/Loading';
import { Button } from '@/components/ui/button'
import { notFound, useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import PolicyDetailsPage from './policydetails';
import { useStatusPageContext } from '@/lib/statusPage/statusContext';
import ErrorMessage from '@/components/errorMessage/errorMessage';
import isAuth from '@/lib/auth/isAuth';

const PolicyPage = () => {
    const router = useRouter();
    const params = useParams();
    const [policyData, setPolicyData] = useState<PolicyDetails>();
    const { isLoading, showMessageError, setShowMessageError, setIsLoading } = useStatusPageContext();

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
                if (policyDataResponse.status == 200 && policyDataResponse.data) {
                    setPolicyData(policyDataResponse.data);
                    setIsLoading(false);
                    if(showMessageError){
                        setShowMessageError(false);
                    }
                    return;
                }
                if(policyDataResponse.status == 404){
                    return router.push("/notfound");
                }

                throw new Error("Error al recuperar datos póliza");
                
            } catch (error) {
                setShowMessageError(true);
                setIsLoading(false);
            }
        };
        fetchDetails();
    }, []);

    return (
        <>
            {isLoading ? (<Loading></Loading>) : (<></>)}
            {showMessageError ? (<ErrorMessage></ErrorMessage>) : (<></>)}

            {policyData ? (<PolicyDetailsPage policyData={policyData}></PolicyDetailsPage>) : (<></>)}
        </>
    )
}

export default isAuth(PolicyPage)