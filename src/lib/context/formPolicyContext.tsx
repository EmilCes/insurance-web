import { createContext, useContext, useState, ReactNode } from "react";

interface FormPolicyData {
    idBrand?: number;
    idModel?: number;
    series?: string;
    plates?: string;
    idColor?: number;
    idType?: number;
    occupants?: number;
    idService?: number;
    yearOfPolicy?: number;
    idPolicyPlan?: string;
    perMonthsPayment?: number;
}

interface FormPolicyContextType {
    formPolicyData: FormPolicyData;
    setFormPolicyData: (data: Partial<FormPolicyData>) => void;
    deleteFormPolicyData: () => void;
    setIsPreviousSelected: (data: boolean) => void;
    isPreviousSelected: boolean;
}

const FormPolicyContext = createContext<FormPolicyContextType | undefined>(undefined);

export const FormPolicyProvider = ({ children }: { children: ReactNode }) => {
    const [formPolicyData, setFormPolicy] = useState<FormPolicyData>({});
    const [isPreviousSelected, setIsPreviousSelected] = useState<boolean>(false);

    const updateFormPolicyData = (data: Partial<FormPolicyData>) => {
        setFormPolicy((prev) => ({ ...prev, ...data }));
    }

    const clearFormPolicyData = () => {
        setFormPolicy({
            idBrand: undefined,
            idModel: undefined,
            series: undefined,
            idColor: undefined,
            plates: undefined,
            idType: undefined,
            occupants: undefined,
            idService: undefined,
            yearOfPolicy: undefined,
            idPolicyPlan: undefined
        });
    };

    return (
        <FormPolicyContext.Provider value={{
            formPolicyData, setFormPolicyData: updateFormPolicyData,
            deleteFormPolicyData: clearFormPolicyData, isPreviousSelected: isPreviousSelected,
            setIsPreviousSelected: setIsPreviousSelected
        }}>
            {children}
        </FormPolicyContext.Provider>
    );
}

export const useFormPolicyContext = () => {
    const context = useContext(FormPolicyContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
}

