import { fetchWithAuth } from "./fecthWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface BrandModelItem {
    idBrand: number;
    name: string;
    year: string;
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
