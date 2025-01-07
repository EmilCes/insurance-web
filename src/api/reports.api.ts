import { FetchDataParams } from "@/app/(main)/dashboard/reports/ListPage";
import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Photograph {
    name: string;
    url: string;
}

export interface CreateReportResponse {
    reportNumber: string;
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

export interface VehicleInfo {
    address: string;
    plates: string;
    modelYear: string;
    brand: string;
}

export interface ReportData {
    reportNumber: string;
    creationDate: string;
    decisionDate?: string;
    status: string;
    vehicle: VehicleInfo;
    policyPlan?: string;
}

export interface PendingReportData {
    reportNumber: string;
    description: string;
    date: string;
    latitude: string; // Modificar a string ya que el backend devuelve estos valores como strings
    longitude: string; 
    Driver: {
        phone: string;
        Account: {
            name: string;
        };
    };
    Vehicle: {
        plates: string;
    };
}



export interface PageInfo {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
}

export interface ReportsResponse {
    data: ReportData[];
    pageInfo: PageInfo;
}

export interface ReportFilters {
    page: number;
    status?: number;
    startYear?: number;
    endYear?: number;
}

export interface UpdateDictamenData {
    result: string;
}

export interface DetailedReportData {
    reportNumber: string;
    description: string;
    date: string;
    decisionDate?: string | null;
    latitude: string;
    longitude: string;
    status: string;
    dictumResult: string;
    photographs: Photograph[];
    implicateParties: [{
        name: string;
        plates: string;
        brand: string;
        color: string;
    }];
    driver: {
        "phone": string;
        "licenseNumber": string;
        "name": string;
        "email": string;
    };
    vehicle: {
        plates: string;
        serialNumberVehicle: string;
        occupants: number;
        color: string;
        modelYear: string;
        brand: string;
        type: string;
        serviceVehicle: string;
    };
    policy: {
        serialNumber: string;
        startDate: string;
        policyPlan: {
            title: string;
            description: string;
        };
    };
}

interface DetailedReportResponse {
    data: DetailedReportData;
}

export async function createReport(
    createReportData: CreateReportData,
): Promise<CreateReportResponse | null> {
    const formData = new FormData();

    formData.append("serialNumber", createReportData.serialNumber);

    formData.append(
        "location[latitude]",
        createReportData.location.latitude.toString(),
    );

    formData.append(
        "location[longitude]",
        createReportData.location.longitude.toString(),
    );

    createReportData.involvedPeople.forEach((person, index) => {
        formData.append(`involvedPeople[${index}][name]`, person.name);
        formData.append(
            `involvedPeople[${index}][brandId]`,
            person.brandId.toString(),
        );
        formData.append(
            `involvedPeople[${index}][colorId]`,
            person.colorId.toString(),
        );
        formData.append(`involvedPeople[${index}][plates]`, person.plates);
    });

    createReportData.images.forEach((file) => {
        formData.append("images", file);
    });

    const response = await fetchWithAuth(`${API_URL}/reports`, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const values: CreateReportResponse = await response.json();
        return values;
    }

    return null;
}

export async function getReports(
    params: FetchDataParams<ReportFilters>,
): Promise<ReportsResponse> {
    try {
        const queryParams = new URLSearchParams();

        if (params.page !== undefined) {
            queryParams.append("page", params.page.toString());
        }

        const filters = params.filters || {};

        if (filters.status !== undefined) {
            queryParams.append("status", filters.status.toString());
        }

        if (filters.startYear !== undefined) {
            queryParams.append("startYear", filters.startYear.toString());
        }

        if (filters.endYear !== undefined) {
            queryParams.append("endYear", filters.endYear.toString());
        }

        if (params.search) {
            queryParams.append("reportNumber", params.search.toString());
        }

        const url = `${API_URL}/reports?${queryParams.toString()}`;
        console.log(url);
        const response = await fetchWithAuth(url, {
            method: "GET",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error ${response.status}: ${errorText}`);
        }

        const data: ReportsResponse = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching reports: ", error);
        throw error;
    }
}

export async function getDetailedReport(
    reportNumber: string,
): Promise<DetailedReportData | null> {
    try {
        const url = `${API_URL}/reports/detail/${reportNumber}`;
        const response = await fetchWithAuth(url, {
            method: "GET",
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error ${response.status}: ${errorText}`);
        }

        const data: DetailedReportResponse = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching detailed report: ", error);
        return null;
    }
}

export async function updateReportDictum(
    reportNumber: string,
    dictamenData: UpdateDictamenData,
  ): Promise<boolean> {
    try {
      const url = `${API_URL}/reports/${reportNumber}/dictum`;
      const response = await fetchWithAuth(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dictamenData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP Error ${response.status}: ${errorText}`);
        return false;
      }
  
      return true;
    } catch (error) {
      console.error("Error updating report dictamen: ", error);
      return false;
    }
  }

  // Obtener reportes pendientes
  export async function getPendingReports(): Promise<PendingReportData[]> {
    try {
        const url = `${API_URL}/reports?status=1`; // Endpoint para reportes pendientes
        console.log("Request URL (getPendingReports):", url);

        const response = await fetchWithAuth(url, { method: "GET" });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error ${response.status}: ${errorText}`);
        }

        // Ajuste para mapear la estructura de respuesta
        const data: { data: PendingReportData[] } = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching pending reports:", error);
        throw error;
    }
}


  // Obtener ajustadores disponibles
  // Definición del tipo Adjuster
    export interface Adjuster {
        id: number;
        name: string;
        email: string;
    }
  
  // Obtener ajustadores disponibles
  export async function getAvailableAdjusters(): Promise<Adjuster[]> {
    try {
      const url = `${API_URL}/reports/available-adjusters`; // Endpoint para ajustadores disponibles
      console.log("Request URL (getAvailableAdjusters):", url);
  
      const response = await fetchWithAuth(url, { method: "GET" });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${errorText}`);
      }
  
      const data: Adjuster[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching available adjusters:", error);
      throw error;
    }
  }
  
  
  // Asignar ajustador a un reporte
  export interface AssignAdjusterData {
    reportNumber: string;
    assignedEmployeeId: number;
  }
  
  export async function assignAdjusterToReport(
    assignData: AssignAdjusterData
  ): Promise<boolean> {
    try {
      const url = `${API_URL}/reports/${assignData.reportNumber}/assign`;
      console.log("Request URL (assignAdjusterToReport):", url);
  
      const response = await fetchWithAuth(url, {
        method: "PUT", // Según el backend, el método es PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignedEmployeeId: assignData.assignedEmployeeId,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error ${response.status}: ${errorText}`);
      }
  
      return true;
    } catch (error) {
      console.error("Error assigning adjuster to report:", error);
      return false;
    }
  }
  