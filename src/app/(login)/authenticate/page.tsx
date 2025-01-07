"use client"

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import TwoFactorFormAuthenticator from "@/components/forms/2faAutenticator.form";

const Enable2fa = () => {
    const router = useRouter();
    const [otpauthUrl, setOtpAuthUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);  

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            
            <div className="flex justify-center items-center bg-white p-8">
                <div className="w-full max-w-sm">
                    <h2 className="text-3xl font-semibold text-center mb-6">Autenticación</h2>
                    <h3 className="text-alternGray text-center">Por favor, para iniciar tu sesion ingresa el código de tu aplicación de autenticación.</h3>
                    <br />
                    <div />
                    <br />
                    
                    <TwoFactorFormAuthenticator />
                    <br />
                    <p className="text-sm text-gray-600 text-center">
                        ¿Cuenta incorrecta?{' '}
                        <Link href="/signIn" className="text-blue-500 hover:underline">
                            Cambiar de cuenta
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
    );
};

export default Enable2fa;
