"use client"

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import TwoFactorForm from "@/components/forms/2faEnabler.form";

const Enable2fa = () => {
    const router = useRouter();
    const [otpauthUrl, setOtpAuthUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        const storedOtpAuthUrl = localStorage.getItem("otpauthUrl");
        console.log(localStorage.getItem("otpauthUrl"));
        if (storedOtpAuthUrl) {
            setOtpAuthUrl(storedOtpAuthUrl);  
        }
        setLoading(false);  
    }, []);  

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p>Cargando...</p>  
            </div>
        );
    }

    if (!otpauthUrl) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p>Error: no se pudo cargar el código QR.</p>  
            </div>
        );
    }

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
                    <h2 className="text-3xl font-semibold text-center mb-6">Verificación de dos factores</h2>
                    <h3 className="text-alternGray text-center">Por favor, para finalizar tu registro escanea el siguiente código QR con una aplicación de autenticación.</h3>
                    <br />
                    <div />

                    <div className="flex justify-center items-center">
                        <QRCodeSVG value={otpauthUrl} size={200} />
                    </div>
                    <br />
                    
                    <TwoFactorForm />
                    <br />
                    <p className="text-sm text-gray-600 text-center">
                        ¿Cuenta incorrecta?{' '}
                        <Link href="/signIn" className="text-blue-500 hover:underline">
                            Inicio de sesion
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Enable2fa;
