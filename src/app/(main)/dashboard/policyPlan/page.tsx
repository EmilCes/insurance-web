"use client"

import VehiculeForm from "@/components/forms/vehicle.form"
import isAuth from "@/lib/auth/isAuth";

const PolicyPlan = () => {
    return (
        <>
            <VehiculeForm />
        </>
    )
}

export default isAuth(PolicyPlan)