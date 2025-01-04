import { fetchWithAuth } from "./fetchWithAuth";
import {
    BrandDetails,
    ColorDetails,
    DriverDetails,
    VehicleDetails,
} from "./policy.api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Photographs {
    name: string;
    url: string;
}

interface ImplicateParties {
    name: string;
    plates: string;
    Brand: BrandDetails;
    Color: ColorDetails;
}

export interface CreateReportResponse {
    serialNumber: string;
    latitude: number;
    longitude: number;
    date: Date;
    Photographs: Photographs[];
    Vehiclle: VehicleDetails;
    Driver: DriverDetails;
    ImplicateParties: ImplicateParties[];
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface InvolvedPerson {
    name: string;
    brandId: number;
    colorId: number;
    plates: string;
}

export interface CreateReportData {
    serialNumber: string;
    images: File[];
    location: Location;
    involvedPeople: InvolvedPerson[];
}

export async function createReport(
    createReportData: CreateReportData,
): Promise<CreateReportResponse | null> {
    const formData = new FormData();

    formData.append("serialNumber", createReportData.serialNumber);

    // Para 'location'
    formData.append(
        "location[latitude]",
        createReportData.location.latitude.toString(),
    );
    formData.append(
        "location[longitude]",
        createReportData.location.longitude.toString(),
    );

    // Para 'involvedPeople'
    createReportData.involvedPeople.forEach((person, index) => {
        formData.append(`involvedPeople[${index}][name]`, person.name);
        formData.append(`involvedPeople[${index}][brandId]`, person.brandId.toString());
        formData.append(`involvedPeople[${index}][colorId]`, person.colorId.toString());
        formData.append(`involvedPeople[${index}][plates]`, person.plates);
    });

    createReportData.images.forEach((file) => {
        formData.append("images", file);
    });

    const response = await fetchWithAuth(`${API_URL}/reports`, {
        method: "POST",
        body: formData,
    });

    console.log(response);

    if (response.ok) {
        const values: CreateReportResponse = await response.json();
        return values;
    }

    return null;
}
