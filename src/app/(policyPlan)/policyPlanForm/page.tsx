"use client"
import TitleBar from "@/components/dashboard/TitleBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PolicyPlanForm from "@/components/forms/policyPlan.form";
import isAuth from "@/lib/auth/isAuth";
import isCorrectRole from "@/lib/auth/isCorrectRole";
import BreadcrumbPolicyPlanForm from "./breadcrumbPolicyPlanForm";

const PolicyPlanPage = () => {
    return (
        <div className="p-0">
            <TitleBar title="Registrar Plan de Póliza" />
            <BreadcrumbPolicyPlanForm id={null}></BreadcrumbPolicyPlanForm>
            <PolicyPlanForm idPolicyPlan={""} />
        </div>

    )
};


export default isAuth(isCorrectRole(PolicyPlanPage, "Administrador"));