"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./authContext";
import Loading from "@/components/loading/Loading";
import { useEffect } from "react";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
        router.push(`${basePath}/signIn`);
      }
    }, [isLoading, isAuthenticated]);

    if (isLoading) {
      return <Loading />
    }

    return <Component {...props} />;
  };
}