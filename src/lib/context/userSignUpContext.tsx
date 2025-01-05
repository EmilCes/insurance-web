import { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
    id?: number;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    licenseNumber?: string;
    rfc?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    address?: string;
    postalCode?: string;
    state?: string;
    municipality?: string;
    bankAccountNumber?: string;
    expirationDateBankAccount?: string
}

interface UserContextType {
    userData: UserData;
    setUserData: (data: Partial<UserData>) => void;
    deleteUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData>({});

    const updateUserData = (data: Partial<UserData>) => {
        setUserData((prev) => ({ ...prev, ...data }));
    }

    const clearUserData = () => {
        setUserData({
            id: undefined,
            firstName: undefined,
            lastName: undefined,
            birthDate: undefined,
            licenseNumber: undefined,
            rfc: undefined,
            email: undefined,
            phoneNumber: undefined,
            address: undefined,
            password: undefined,
            postalCode: undefined,
            state: undefined,
            municipality: undefined,
            bankAccountNumber: undefined,
            expirationDateBankAccount: undefined,
        });
    };

    return (
        <UserContext.Provider value={{ userData, setUserData: updateUserData, deleteUserData: clearUserData }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}
