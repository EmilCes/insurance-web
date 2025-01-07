import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
interface ValidatePlatesResponse {
    isValid: boolean;
    status: number;
}

export type ColorsVehicleResponse = ColorVehicleItem[];

interface ColorVehicleItem {
    idColor: number;
    vehicleColor: string;
}

export type VehiclesCurrentAllResponse = VehiclesCurrentItem[];

export interface VehiclesCurrentItem {
    idBrand: number;
    idModel: number;
    serialNumber: string;
    idColor: number;
    plates: string;
    idType: number;
    occupants: number;
    idService: number;
    brandName: string;
    modelName: string;
    colorName: string;
    typeName: string;
    serviceName: string;
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

export async function getCurrentAllVehicles(): Promise<VehiclesCurrentAllResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/vehicles/currentAll`, {
        method: 'GET'
    });
    
    if (response.ok) {
        const values: VehiclesCurrentAllResponse = await response.json();
        return values;
    }
    return null;
}