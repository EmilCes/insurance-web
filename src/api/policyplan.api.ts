import { fetchWithAuth } from "./fecthWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ValidatePlatesResponse {
    isValid: boolean;
    status: number;
}

export type ColorsVehicleResponse = ColorVehicleItem[];

interface ColorVehicleItem {
    idColor: number;
    vehicleColor: string;
}

export type BrandsVehicleResponse = BrandVehicleItem[];

export interface BrandVehicleItem {
    idBrand: number;
    name: string;
    Model: ModelVehicleResponse;
}

export type ModelVehicleResponse = ModelVehicleItem[];

interface ModelVehicleItem {
    idModel: number;
    year: string;
    idBrand: number;
}


export interface PolicyCreateData {
    idBrand: number;
    idModel: number;
    series: string;
    plates: string;
    idColor: number;
    idType: number;
    occupants: number;
    idService: number;
    yearOfPolicy: number;
    idPolicyPlan: string;
    perMonthsPayment: number;
}

export type TypeVehicleResponse = TypeVehicleItem[];

interface TypeVehicleItem {
    idType: number;
    vehicleType: string;
}

export type ServicesVehicleResponse = ServiceVehicleItem[];

interface ServiceVehicleItem {
    idService: number;
    name: string;
}

interface CreatePolicyData {
    serialNumber: string;
    planTitle: string,
    planDescription: string;
}

export type ServicePolicyResponse = ServicePolicyItem[];

interface ServicePolicyItem {
    idService: number;
    name: string;
    isCovered: boolean;
    coveredCost: number;
    idPolicyPlan: string;
}


export interface CreatePolicyResponse {
    status: number;
    serialNumber: string;
    planTitle: string,
    planDescription: string;
}

export interface BrandModelItem {
    idBrand: number;
    name: string;
    year: string;
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

export async function getBrandsVehicles(): Promise<BrandsVehicleResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/brands`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: BrandsVehicleResponse = await response.json();
        return values;
    }
    return null;
}

export async function getColorsVehicles(): Promise<ColorsVehicleResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/vehicles/colors`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: ColorsVehicleResponse = await response.json();
        return values;
    }
    return null;
}

export async function getTypesVehicles(): Promise<TypeVehicleResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/vehicles/types`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: TypeVehicleResponse = await response.json();
        return values;
    }
    return null;
}

export async function getServicesVehicles(): Promise<ServicesVehicleResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/vehicles/services`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: ServicesVehicleResponse = await response.json();
        return values;
    }
    return null;
}

export async function validatePlates(values: { plates: string }): Promise<ValidatePlatesResponse> {
    const response = await fetchWithAuth(`${API_URL}/vehicles/plates/${values.plates}`, {
        method: 'GET'
    });
    let isValid = false;
    if (response.ok) {
        isValid = true;
    }
    const vehiclePlates: ValidatePlatesResponse = {
        isValid: isValid,
        status: response.status
    };
    return vehiclePlates;
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

export async function getBrandModelData(idModel: number): Promise<BrandModelItem | null> {
    const response = await fetchWithAuth(`${API_URL}/brands/models/${idModel}`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: BrandModelItem = await response.json();
        return values;
    }
    return null;
}

export async function createPolicyData(policyData: PolicyCreateData): Promise<CreatePolicyResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/policies/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(policyData),
    });
    if (response.status == 201) {
        const policyData: CreatePolicyData = await response.json();
        const values: CreatePolicyResponse = { status: response.status, ...policyData };
        return values;
    }
    return null;
}