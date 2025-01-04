import { fetchWithAuth } from "./fetchWithAuth";

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

export interface PolicyPlanStatusItem {
    idPolicyPlan: string;
    title: string;
    description: string;
    maxPeriod: number;
    basePrice: number;
    idPolicyPlanStatus: number;
    Service: ServicePolicyResponse;
    PolicyPlanStatus: StatusItem;
}

export interface StatusItem {
    idPolicyPlanStatus: number;
    policyPlanStatusType: string;
};

export interface PlanPolicyResponse{
    idPolicyPlan: string;
    title: string;
    description: string;
    maxPeriod: number;
    basePrice: string; 
    idPolicyPlanStatus: number;
}

export interface DataPlanPolicyPageRequest{
    page?: number;
    status?: number;
    name?: string;
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

export async function getPolicyPlanStatusData(id: string): Promise<PolicyPlanStatusItem | null> {
    const response = await fetch(`${API_URL}/policy-plan/status/${id}`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: PolicyPlanStatusItem = await response.json();
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
            return data;
        }
        const errorData = await response.json();
        return { status: response.status, message: errorData.message };
    } catch (error: any) {
        console.error('Error en el cliente:', error.message || error);
        return null;
    }
}

export async function updatePolicyPlanStatusData(statusPayload: { idPolicyPlanStatus: number }, id: string): Promise<PolicyPlanStatusItem | { status: number, message: string } | null> {
    try {
        //PONER ROLES
        const response = await fetch(`${API_URL}/policy-plan/status/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusPayload),
        });

        if (response.status === 200) {
            const data: PolicyPlanStatusItem = await response.json();
            return data;
        }
        const errorData = await response.json();
        return { status: response.status, message: errorData.message };
    } catch (error: any) {
        console.error('Error en el cliente:', error.message || error);
        return null;
    }
}

export async function deletePolicyPlan(id: string): Promise<number | null> {
    const response = await fetch(`${API_URL}/policy-plan/${id}`, {
        method: 'DELETE'
    });
    console.log("response.status"+response.status);
    if (response.status === 200) {
        return response.status;
    }
    return response.status;
}

export async function getPolicyPlanPages(data: DataPlanPolicyPageRequest): Promise<PlanPolicyResponse[] | null> {
    let URL = `${API_URL}/policy-plan?page=${data.page}&status=${data.status}`;

    if (data.name) {
        URL += `&name=${encodeURIComponent(data.name)}`;
    }

    const response = await fetch(URL, {
        method: 'GET',
    });
    if (response.status === 200) {
        const values: PlanPolicyResponse[] = await response.json();
        return values;
    }
    if (response.status === 404) {
        const values: PlanPolicyResponse[] = []; 
        return values;
    }
    return null;
}
