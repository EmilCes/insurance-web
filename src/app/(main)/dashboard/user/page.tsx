"use client"

import DisplayUserData from "@/components/forms/userData.form";
import TitleBar from "@/components/dashboard/TitleBar";
import { StatusPageProvider } from "@/lib/statusPage/statusContext";

const User = () => {
    return (
        <div>
            <StatusPageProvider>
                <TitleBar title="Mi cuenta" />

                {/* Aquí cambiamos max-w-sm a w-full */}
                <div className="flex justify-center items-center bg-white p-8">
                    <div className="w-full">  {/* Elimina max-w-sm */}
                        <br />
                        <DisplayUserData />
                        <br />
                    </div>
                </div>
            </StatusPageProvider>
        </div>
    )
}


export default User;
