import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type StateResponse = StateData[]

export interface StateData {
    idState: number;
    stateName: string;
}

export type MunicipalityResponse = MunicipalityData[]

interface MunicipalityData {
    idMunicipality: number;
    municipalityName: string;
    idState: number;
}

export async function getStates(): Promise<StateResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/state`, {
        method: 'GET',
    });
    if (response.ok) {
        const values: StateResponse = await response.json();
        return values;
    }
    return null;
}

export async function getMunicipalities(): Promise<MunicipalityResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/municipality`, {
        method: 'GET',
    });
    if (response.ok) {
        const values: MunicipalityResponse = await response.json();
        return values;
    }
    return null;
}

