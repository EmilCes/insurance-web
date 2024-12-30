"use client"

import ErrorMessage from "@/components/errorMessage/errorMessage";
import VehiculeForm from "@/components/forms/vehicle.form"
import Loading from "@/components/loading/Loading";
import isAuth from "@/lib/auth/isAuth";
import isDriver from "@/lib/auth/isDriver";
import { useStatusPageContext } from "@/lib/statusPage/statusContext";

const PolicyPlan = () => {
    const { isLoading, showMessageError } = useStatusPageContext();
    return (
        <>
            { isLoading ? (<Loading></Loading>) : (<></>)}
            { showMessageError ? (<ErrorMessage></ErrorMessage>) : (<></>)}
            <VehiculeForm />
        </>
    )
}

export default isDriver(isAuth(PolicyPlan))