import { UUID } from "crypto";
import { fetchWithAuth } from "./fecthWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export interface ServiceCreate {
    name: string;
    isCovered: boolean;
    coveredCost: number;
}

export interface PolicyPlanCreate {
    title: string;
    description: string;
    maxPeriod: number;
    basePrice: number;
    service: ServiceCreate[];
}


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
    const response = await fetch(`${API_URL}/policy-plan/${id}`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: PolicyPlanItem = await response.json();
        return values;
    }
    return null;
}

export async function createPolicyPlanData(policyPlanData: PolicyPlanCreate): Promise<PolicyPlanItem | { status: number, message: string } | null> {
    try {
        const response = await fetch(`${API_URL}/policy-plan`, { //PONER ROLES CAMBIAR A FETCH CON AUTORIZACION
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(policyPlanData),
        });

        if (response.status === 201) {
            const data: PolicyPlanItem = await response.json();
            return data;
        }
        const errorData = await response.json();
        return { status: response.status, message: errorData.message };
    } catch (error) {
        console.error('Error al crear el plan de póliza:', error);
        return null;
    }
}


export async function updatePolicyPlanData(policyPlanData: PolicyPlanCreate, id: string): Promise<PolicyPlanItem | { status: number, message: string } | null> {
    try {
        //PONER ROLES
        const response = await fetch(`${API_URL}/policy-plan/${id}`, { 
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(policyPlanData),
        });

        if (response.status === 200) {
            const data: PolicyPlanItem = await response.json();
            console.log("response.statusresponse.status"+response.status);
            return data;
        }
        console.log("statuserror.statuserror.statuserror"+response.status);
        const errorData = await response.json();
        return { status: response.status, message: errorData.message };
    }  catch (error: any) {
        console.error('Error en el cliente:', error.message || error);
        return null;
    }
}

