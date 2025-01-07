"use client"

import ModifyUserForm from "@/components/forms/modifyUser.form";
import TitleBar from "@/components/dashboard/TitleBar";
import { StatusPageProvider } from "@/lib/statusPage/statusContext";
import { UserProvider } from "@/lib/context/userSignUpContext";
import isAuth from "@/lib/auth/isAuth";
import isCorrectRole from "@/lib/auth/isCorrectRole";
import BreadcrumbUserPage from "../breadcrumbUser";

const ModifyUser = () => {
    return (
        <div>
            <UserProvider>
                <StatusPageProvider>
                    <TitleBar title="Mi cuenta" />
                    <BreadcrumbUserPage isModifying/>

                    <div className="flex justify-center items-center bg-white p-8">
                        <div className="w-full">
                            <br />
                            <ModifyUserForm />
                            <br />
                        </div>
                    </div>
                </StatusPageProvider>
            </UserProvider>
        </div>
    )
}


export default isAuth(isCorrectRole(ModifyUser, "Conductor"))
