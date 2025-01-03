"use client";

import { PlanPolicyResponse } from "@/api/policyplan.api";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import React from "react";

const PolicyPlanItem = ({ policyPlanItem }: { policyPlanItem: PlanPolicyResponse }) => {
  const router = useRouter();
  const isActive = policyPlanItem.idPolicyPlanStatus === 1;
  return (
    <div className="border rounded-lg shadow-md p-4 flex items-center justify-between mb-4">
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          {policyPlanItem.title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{policyPlanItem.description}</p>
        <div className="flex mt-3 text-sm">
          <div className="mr-6">
            <h4 className="font-medium text-gray-800">Plazo Máximo:</h4>
            <p>{policyPlanItem.maxPeriod} meses</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Precio base:</h4>
            <p>${policyPlanItem.basePrice}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div
          className={`px-4 py-2 rounded-md border text-center font-semibold text-lightBlue ${isActive ? "border-lightBlue bg-white" : "border-gray-400 bg-gray-100 text-gray-400"
            }`}
        >
          {isActive ? "Activa" : "Inactiva"}
        </div>
        <Button
          className="px-4 py-2 mt-2 bg-darkBlue text-white rounded-md shadow-sm hover:bg-blue-600"
          onClick={() => router.push(`/policyPlans/${policyPlanItem.idPolicyPlan}`)}
        >
          Ver más
        </Button>
      </div>
    </div>
  );
};

export default PolicyPlanItem;
