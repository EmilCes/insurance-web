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

export interface PolicyDetailsErrorResponse {
    status: number;
}

export interface DataPolicyPageRequest {
    page: number;
    type: string;
    status: number;
    idPolicy: string | undefined;
}

export interface DataPolicyTotalRequest {
    type: string;
    status: number;
}

export type PolicyPlanTypesResponse = PolicyPlanTypeItem[];

export interface PolicyPlanTypeItem {
    planTitle: string;
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

export async function getPoliciesFromPage(data: DataPolicyPageRequest): Promise<PoliciesResponse | null> {
    const URL = (data.idPolicy == undefined ? `${API_URL}/policies?page=${data.page}&type=${data.type}&status=${data.status}` :
        `${API_URL}/policies?page=${data.page}&type=${data.type}&status=${data.status}&idPolicy=${data.idPolicy}`);
        
    const response = await fetchWithAuth(URL, {
        method: 'GET'
    });
    if (response.ok) {
        const values: PoliciesResponse = await response.json();
        return values;
    }
    return null;
}

export async function getTotalNumberPolicies(data: DataPolicyTotalRequest, idPolicy: string | undefined): Promise<number> {
    const URL = (idPolicy == undefined ? `${API_URL}/policies/total?&type=${data.type}&status=${data.status}` :
        `${API_URL}/policies/total?&type=${data.type}&status=${data.status}&idPolicy=${idPolicy}`);

    const response = await fetchWithAuth(URL, {
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
        return { status: response.status, data: values };
    }
    return { status: response.status, data: null };
}

export async function getPolicyPlanTypes() {
    const response = await fetchWithAuth(`${API_URL}/policies/current/types`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: PolicyPlanTypesResponse = await response.json();
        return values;
    }
    return null;
}

export async function cancelPolicy(serialNumber: any): Promise<number> {
    const token = localStorage.getItem("token");
    const response = await fetchWithAuth(`${API_URL}/policies/cancel/${serialNumber}`, {
        method: 'PUT'
    });
    return response.status;
}