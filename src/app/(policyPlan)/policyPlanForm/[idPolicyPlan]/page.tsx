"use client"
import TitleBar from "@/components/dashboard/TitleBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PolicyPlanForm from "@/components/forms/policyPlan.form";
import { useParams } from "next/navigation";
import isAuth from "@/lib/auth/isAuth";
import isCorrectRole from "@/lib/auth/isCorrectRole";
import BreadcrumbPolicyPlanForm from "../breadcrumbPolicyPlanForm";

const PolicyPlanPageId = () => {
    const params = useParams();
    const idPolicyPlan = Array.isArray(params?.idPolicyPlan) 
        ? params.idPolicyPlan[0] 
        : params?.idPolicyPlan || "";

    return (
        <div className="p-0">
            <TitleBar title="Registrar Plan de Póliza" />
            <BreadcrumbPolicyPlanForm id={idPolicyPlan}></BreadcrumbPolicyPlanForm>
            <PolicyPlanForm idPolicyPlan={idPolicyPlan} />
        </div>
    );
};

export default isAuth(isCorrectRole(PolicyPlanPageId, "Administrador"))
