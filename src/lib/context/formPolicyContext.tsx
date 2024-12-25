import { createContext, useContext, useState, ReactNode } from "react";

interface FormPolicyData{
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
}

const FormPolicyContext = createContext<FormPolicyContextType | undefined>(undefined);

export const FormPolicyProvider = ({ children }: {children : ReactNode}) => {
    const [formPolicyData, setFormPolicy ] = useState<FormPolicyData>({});

    const updateFormPolicyData = (data: Partial<FormPolicyData>) => {
        setFormPolicy((prev) => ({ ...prev, ...data }));
    }

    return (
        <FormPolicyContext.Provider value={{ formPolicyData , setFormPolicyData: updateFormPolicyData}}>
            { children }
        </FormPolicyContext.Provider>
    );
}

export const useFormPolicyContext = () => {
    const context = useContext(FormPolicyContext);
    if(!context){
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
}

