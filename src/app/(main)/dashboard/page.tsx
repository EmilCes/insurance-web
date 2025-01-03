"use client"

import TitleBar from "@/components/dashboard/TitleBar";
import isAuth from "@/lib/auth/isAuth";
import isCorrectRole from "@/lib/auth/isCorrectRole";

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

export default isAuth(isCorrectRole(DashboardPage, "Conductor,Ajustador,Ejecutivo de asistencia,Administrador"));