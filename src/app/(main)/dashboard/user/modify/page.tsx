"use client"

import ModifyUserForm from "@/components/forms/modifyUser.form";
import TitleBar from "@/components/dashboard/TitleBar";
import { StatusPageProvider } from "@/lib/statusPage/statusContext";
import { UserProvider } from "@/lib/context/userSignUpContext";

const ModifyUser = () => {
    return (
        <div>
            <UserProvider>
                <StatusPageProvider>
                    <TitleBar title="Mi cuenta" />

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


export default ModifyUser;
