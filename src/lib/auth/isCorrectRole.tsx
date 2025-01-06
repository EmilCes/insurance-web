"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";
import Loading from "@/components/loading/Loading";

export default function isCorrectRole(Component: any, specificRoles: string) {
    return function IsCorrectRole(props: any) {
        const { role } = useAuth();
        const router = useRouter();

        useEffect(() => {
            const possibleRoles = specificRoles.split(",");
            if (!possibleRoles.includes(role)) {
                router.push("/noauthorization");
            }
        }, [role, router]);

        if (!role) {
            return <Loading />;
        }

        return <Component {...props} />;
    };
}
