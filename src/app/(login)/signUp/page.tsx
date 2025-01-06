"use client"

import SignUpForm from "@/components/forms/signup.form";
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
  return (
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
                    <h3 className="text-alternGray">¡Bienvenido! Por favor, ingresa tus datos personales.</h3>
                    <br />
                    <SignUpForm/>
                    <br />
                    <p className="text-sm text-gray-600 text-center">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href="/signIn" className="text-blue-500 hover:underline">
                            Iniciar sesion
                        </Link>
                    </p>
                </div>
            </div>

        </div>
  )
}

export default SignUp;
