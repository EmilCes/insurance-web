import { fetchWithAuth } from "./fecthWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ServicePolicyResponse = ServicePolicyItem[];

interface ServicePolicyItem {
    idService: number;
    name: string;
    isCovered: boolean;
    coveredCost: number;
    idPolicyPlan: string;
}

export type PolicyPlansResponse = PolicyPlanItem[];

export interface PolicyPlanItem {
    idPolicyPlan: string;
    title: string;
    description: string;
    maxPeriod: number;
    basePrice: number;
    idPolicyPlanStatus: number;
    Service: ServicePolicyResponse;
}

export async function getPolicyPlans(): Promise<PolicyPlansResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/policy-plan/current`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: PolicyPlansResponse = await response.json();
        return values;
    }
    return null;
}

export async function getPolicyPlanData(id: string): Promise<PolicyPlanItem | null> {
    const response = await fetchWithAuth(`${API_URL}/policy-plan/${id}`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: PolicyPlanItem = await response.json();
        return values;
    }
    return null;
}