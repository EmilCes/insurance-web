"use client"

import LoginForm from "@/components/forms/login.form";
import { useAuth } from "@/lib/auth/authContext";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const SignIn = () => {

    const { isAuthenticated } = useAuth();
    
    useEffect(() => {
        if (isAuthenticated) {
          return redirect('/dashboard');
        }
      }, [isAuthenticated]);

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            
            <div className="flex justify-center items-center bg-white p-8">
                <div className="w-full max-w-sm">
                    <h2 className="text-3xl font-semibold text-center mb-6">Log in</h2>
                    <h3 className="text-alternGray">Welcome back! Please enter your details.</h3>
                    
                    <LoginForm />

                </div>
            </div>

            <div className="hidden md:block relative">
                <Image 
                    src="/signInBackground.svg"
                    alt="Sign In Image"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
    )
}

export default SignIn;