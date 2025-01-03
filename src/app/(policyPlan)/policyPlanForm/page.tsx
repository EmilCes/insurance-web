"use client"
import TitleBar from "@/components/dashboard/TitleBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PolicyPlanForm from "@/components/forms/policyPlan.form";

const PolicyPlanPage = () => {
    return (
        <div className="p-0">
            <TitleBar title="Registrar Plan de Póliza" />
            <PolicyPlanForm idPolicyPlan={""} />
        </div>

    )
};

export default PolicyPlanPage;
