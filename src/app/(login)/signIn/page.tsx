"use client"

import LoginForm from "@/components/forms/login.form";
import { useAuth } from "@/lib/auth/authContext";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

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
                    <h2 className="text-3xl font-semibold text-center mb-6">Iniciar sesion</h2>
                    <h3 className="text-alternGray">¡Bienvenido! Por favor, ingresa tus datos.</h3>
                    <br />
                    <LoginForm />
                    <br />
                    <p className="text-sm text-gray-600 text-center">
                        ¿No tienes una cuenta aún?{' '}
                        <Link href="/signUp" className="text-blue-500 hover:underline">
                            Registro
                        </Link>
                    </p>
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