import { useAuth } from "@/lib/auth/authContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function getPoliciesFromPage(page: number): Promise<PoliciesResponse | null> {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/policies?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.ok) {
            const values: PoliciesResponse = await response.json();
            return values;
        }

        return null;

    } catch (error) {
        console.error('Get policies error:', error);
        throw new Error('Error during get policies. Please try again later.');
    }
}


export async function getTotalNumberPolicies(): Promise<number> {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/policies/total`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.ok) {
            const values: number = await response.json();
            return values;
        }

        return 0;

    } catch (error) {
        console.error('Get number policies error:', error);
        throw new Error('Error during get number policies. Please try again later.');
    }
}

export async function getPolicyDetails(serialNumber: any): Promise<PolicyDetails | null> {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/policies/${serialNumber}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.ok) {
            const values: PolicyDetails = await response.json();
            return values;
        }

        return null;

    } catch (error) {
        console.error('Get policy error:', error);
        throw new Error('Error during get policy. Please try again later.');
    }
}

export async function cancelPolicy(serialNumber: any): Promise<number> {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/policies/cancel/${serialNumber}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.status;

    } catch (error) {
        console.error('Cancel policy error:', error);
        throw new Error('Error during canceling policy. Please try again later.');
    }
}