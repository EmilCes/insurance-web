"use client"

import ReportForm from "@/components/forms/report.form";
import BreadcrumbReportsPage from "../breadcrumReportsPage";
import isCorrectRole from "@/lib/auth/isCorrectRole";
import isAuth from "@/lib/auth/isAuth";

const CreateReportPage = () => {

    return (
        <>
            <BreadcrumbReportsPage id={null} isCreating={true} />
            <div className="my-10 mx-16">

                <ReportForm mode="create" role="Conductor" />

            </div>
        </>
    );
}

export default isAuth(isCorrectRole(CreateReportPage, "Conductor"));