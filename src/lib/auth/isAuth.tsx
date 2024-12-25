"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "./authContext";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isAuthenticated, isLoading } = useAuth();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';


    useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        return redirect(`${basePath}/signIn`);
      }
    }, [isAuthenticated, isLoading]);


    if (isLoading) {
      return <div>Cargando...</div>;
    }

    /*if (!isAuthenticated) {
      return null;
    }*/

    return <Component {...props} />;
  };
}