import { useAuth } from "@/lib/auth/authContext";
import { fetchWithAuth } from "./fecthWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export interface CreatePolicyResponse {
    status: number;
    serialNumber: string;
    planTitle: string,
    planDescription: string;
}

interface CreatePolicyData {
    serialNumber: string;
    planTitle: string,
    planDescription: string;
}

export interface PolicyDetails {
    serialNumber: string;
    monthsOfPayment: number;
    yearsPolicy: number;
    isCanceled: boolean;
    coveredCost: string;
    startDate: string;
    planTitle: string;
    planDescription: string;
    idPolicyPlan: string;
    plates: string;
    idUser: number;
    Driver: DriverDetails;
    Vehicle: VehicleDetails;
    PolicyService: PolicyService[];
}

export interface DriverDetails {
    rfc: string;
    Account: AccountDetails;
}

export interface AccountDetails {
    name: string;
    lastName: string;
    postalCode: string;
    address: string;
    Municipality: MunicipalityDetails;
}

export interface MunicipalityDetails {
    municipalityName: string;
    State: StateDetails;
}

export interface StateDetails {
    stateName: string;
}

export interface VehicleDetails {
    plates: string;
    serialNumberVehicle: string;
    occupants: number;
    ServiceVehicle: ServiceVehicleDetails;
    Type: VehicleTypeDetails;
    Color: ColorDetails;
    Model: ModelDetails;
}

export interface ServiceVehicleDetails {
    name: string;
}

export interface VehicleTypeDetails {
    vehicleType: string;
}

export interface ColorDetails {
    vehicleColor: string;
}

export interface ModelDetails {
    year: string;
    Brand: BrandDetails;
}

export interface BrandDetails {
    name: string;
}

export interface PolicyService {
    name: string;
    isCovered: boolean;
    coveredCost: string;
}

export type PoliciesResponse = PolicyItemResponse[];

export interface PolicyItemResponse {
    serialNumber: string;
    planTitle: string;
    startDate: string;
    yearsPolicy: number;
    isCanceled: boolean;
    Vehicle: VehicleDataBrandModel;
}

export interface VehicleDataBrandModel {
    Model: ModelDetails;
}

export interface PolicyDetailsErrorResponse{
    status: number;
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

export async function getPoliciesFromPage(page: number): Promise<PoliciesResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/policies?page=${page}`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: PoliciesResponse = await response.json();
        return values;
    }
    return null;
}


export async function getTotalNumberPolicies(): Promise<number> {
    const response = await fetchWithAuth(`${API_URL}/policies/total`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: number = await response.json();
        return values;
    }
    return 0;
}

export async function getPolicyDetails(serialNumber: any): Promise<{ status: number; data: PolicyDetails | null }> {
    const response = await fetchWithAuth(`${API_URL}/policies/${serialNumber}`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: PolicyDetails = await response.json();
        return {status: response.status, data: values};
    }
    return {status: response.status, data : null} ;
}

export async function cancelPolicy(serialNumber: any): Promise<number> {
    const token = localStorage.getItem("token");
    const response = await fetchWithAuth(`${API_URL}/policies/cancel/${serialNumber}`, {
        method: 'PUT'
    });
    return response.status;
}