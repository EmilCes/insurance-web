import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserBankAccountResponse {
    bankAccountNumber: string;
    expirationDateBankAccount: string;
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