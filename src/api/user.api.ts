import { fetchWithAuth } from "./fecthWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserBankAccountResponse {
    bankAccountNumber: string;
    expirationDateBankAccount: string;
}

export interface userDataResponse {
    rfc: string;
    bankAccountNumber: string;
    expirationDateBankAccount: string; 
    licenseNumber: string;
    phone: string;

    name: string;
    lastName: string;
    datebirth: string; 
    email: string;
    password: string;
    postalCode: string;
    address: string;
    state: string;
    municipality: string;
}

export interface UserCreateData {
    rfc: string;
    bankAccountNumber: string;
    expirationDateBankAccount: string; 
    licenseNumber: string;
    phone: string;

    name: string;
    lastName: string;
    datebirth: string; 
    email: string;
    password: string;
    postalCode: string;
    address: string;
    idMunicipality: number; 
    secretKey?: string; 
}

export interface UserUpdateData {
    bankAccountNumber: string;
    expirationDateBankAccount: string; 
    licenseNumber: string;
    phone: string;

    postalCode: string;
    address: string;
    idMunicipality: number; 
}

export interface CreateUserResponse {
    status: number;
    serialNumber: string;
    planTitle: string,
    planDescription: string;
}

interface CreateUserData {
    serialNumber: string;
    planTitle: string,
    planDescription: string;
}

export async function updateUser(email: string, updateUserData: UserUpdateData): Promise<any> {
    const response = await fetchWithAuth(`${API_URL}/users/${email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUserData),
    });

    if (response.ok) {
        const updatedUser = await response.json();
        return updatedUser;
    }

    return null;
}

export async function createUser(userData: UserCreateData): Promise<CreateUserResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (response.status === 201) {
        const createdUser: CreateUserData = await response.json();
        const values: CreateUserResponse = { status: response.status, ...createdUser };
        return values;
    }

    return null;
}

export async function getBankNumberUser(): Promise<UserBankAccountResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/users/account`, {
        method: 'GET'
    });
    if (response.ok) {
        const values: UserBankAccountResponse = await response.json();
        return values;
    }
    return null;
}

export async function getUserData(): Promise<userDataResponse | null> {
    const response = await fetchWithAuth(`${API_URL}/users/account/info`, {
        method: 'GET',
    });

    const formatDate = (date: string): string => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('es-MX', options).format(new Date(date));
    };

    if (response.ok) {
        const rawData = await response.json();

        const values: userDataResponse = {
            rfc: rawData.rfc,
            bankAccountNumber: rawData.bankAccountNumber,
            expirationDateBankAccount: formatDate(rawData.expirationDateBankAccount),
            licenseNumber: rawData.licenseNumber,
            phone: rawData.phone,
            name: rawData.Account.name,
            lastName: rawData.Account.lastName,
            datebirth: formatDate(rawData.Account.datebirth),
            email: rawData.Account.email,
            password: rawData.Account.password,
            postalCode: rawData.Account.postalCode,
            address: rawData.Account.address,
            municipality: rawData.Account.Municipality.municipalityName,
            state: rawData.Account.Municipality.State.stateName,
        };

        return values;
    }

    return null;
}


export async function checkEmailExists(email: string): Promise<boolean> {
    const response = await fetchWithAuth(`${API_URL}/users/email-exists?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.exists;
    } else {
        return false;
    }
}

export async function checkRfcExists(rfc: string): Promise<boolean> {
    const response = await fetchWithAuth(`${API_URL}/users/rfc-exists?rfc=${encodeURIComponent(rfc)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.exists;
    } else {
        return false;
    }
}

export async function checkLicenseExists(licenseNumber: string): Promise<boolean> {
    const response = await fetchWithAuth(`${API_URL}/users/license-exists?licenseNumber=${encodeURIComponent(licenseNumber)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.exists;
    } else {
        return false;
    }
}
