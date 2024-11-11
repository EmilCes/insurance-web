"use client"

import TitleBar from "@/components/dashboard/TitleBar";
import isAuth from "@/lib/auth/isAuth";

const DashboardPage = () => {
  return (
    <>
        <TitleBar title="Dashboard" />
        <main>
            <h2>Bienvenido</h2>
        </main>
    </>
  )
}

export default isAuth(DashboardPage);