"use client"

import BillingDataForm from "@/components/forms/billingData.form";
import Image from "next/image";
import { Form } from "react-hook-form";


const BillingData = () => {
    return(
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block relative">
                <Image 
                    src="/signInBackground.svg"
                    alt="Sign In Image"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            <div className="flex justify-center items-center bg-white p-8">
                <div className="w-full max-w-sm">
                    <h2 className="text-3xl font-semibold text-center mb-6">Registro</h2>
                    <h3 className="text-alternGray">Para continuar tu registro ingresa tus datos bancarios.</h3>
                    
                    <br />
                    <BillingDataForm/>

                </div>
            </div>

        </div>
    )
}

export default BillingData;
