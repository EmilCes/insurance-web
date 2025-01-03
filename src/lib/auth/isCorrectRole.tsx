"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";

export default function isCorrectRole(Component: any, specficRoles: string) {
    return function IsCorrectRole(props: any) {
        const router = useRouter();
        const { role } = useAuth();
        const [isCorrectRole, setIsCorrectRole] = useState(false);

        useEffect(() => {
            const posibleRoles = specficRoles.split(",");
            //De los roles posibles verifica si coincide
            if (posibleRoles.indexOf(role) > -1) {
                setIsCorrectRole(true);
                return;
            }
            router.push("/noauthorization");
        }, []);

        if (!isCorrectRole) {
            return <></>;
        }

        return <Component {...props} />;
    };
}