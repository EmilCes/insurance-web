"use client"

import DisplayUserData from "@/components/forms/userData.form";
import TitleBar from "@/components/dashboard/TitleBar";
import { StatusPageProvider } from "@/lib/statusPage/statusContext";
import isAuth from "@/lib/auth/isAuth";
import isCorrectRole from "@/lib/auth/isCorrectRole";
import BreadcrumbUserPage from "./breadcrumbUser";

const UserPage = () => {
    return (
        <div>
            <StatusPageProvider>
                <TitleBar title="Mi cuenta" />
                <BreadcrumbUserPage />
                <div className="flex justify-center items-center bg-white p-8">
                    <div className="w-full">  
                        <br />
                        <DisplayUserData />
                        <br />
                    </div>
                </div>
            </StatusPageProvider>
        </div>
    )
}

export default isAuth(isCorrectRole(UserPage, "Conductor"))

