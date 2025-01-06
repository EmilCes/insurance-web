"use client"

import TitleBar from "@/components/dashboard/TitleBar";
import isAuth from "@/lib/auth/isAuth";
import isCorrectRole from "@/lib/auth/isCorrectRole";
import BreadcrumbHome from "./breadcrumbHome";
import UserInfo from "./userInfo";
import MenuDriver from "./menuDriver";
import MenuAdmin from "./menuAdmin";
import MenuExecutive from "./menuExecutive";
import MenuAdjuster from "./menuAdjuster";
import { useAuth } from "@/lib/auth/authContext";

const DashboardPage = () => {
  const { role } = useAuth();

  return (
    <>
      <TitleBar title="Accidentes UViales" />
      <BreadcrumbHome />
      <main className="mt-5 mb-8 mx-10 md:mx-16">
        <UserInfo role={role}/>
        
        { role === "Conductor" ? <MenuDriver/> : <></>}
        { role === "Ajustador" ? <MenuAdjuster/> : <></>}
        { role === "Administrador" ? <MenuAdmin/> : <></>}
        { role === "Ejecutivo de asistencia" ? <MenuExecutive/> : <></>}

      </main>
    </>
  )
}

export default isAuth(isCorrectRole(DashboardPage, "Conductor,Ajustador,Ejecutivo de asistencia,Administrador"));