"use client";

import { redirect } from "next/navigation";
import { useAuth } from "./authContext";
import Loading from "@/components/loading/Loading";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <Loading />
    }

    if (!isAuthenticated) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      redirect(`${basePath}/signIn`);
    }

    return <Component {...props} />;
  };
}