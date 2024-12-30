"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "./authContext";
import Loading from "@/components/loading/Loading";

export default function isDriver(Component: any) {
    return function IsDriver(props: any) {
        const router = useRouter();
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        const [isCorrectRole, setIsCorrectRole] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem("token");

            if (token) {
                const parts = token.split('.');
                if (parts.length === 3) {
                    const payload = atob(parts[1]);
                    const payloadObject = JSON.parse(payload);

                    console.log(payloadObject.role);
                    if (payloadObject.role == "Conductor") {
                        setIsCorrectRole(true);
                        return;
                    }
                } 
            } 
            router.push("/noauthorization");
        }, []);

        if(!isCorrectRole){
            return <></>;
        }

        return <Component {...props} />;
    };
}