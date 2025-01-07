"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getStates, getMunicipalities } from "@/api/address.api";
import { Button } from "@/components/ui/button";
import { useStatusPageContext } from "@/lib/statusPage/statusContext";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import signUpBillinglDataSchema from "@/schemas/signUpBillingData.schema.";
import { UserProvider, useUserContext } from "@/lib/context/userSignUpContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StateResponse, MunicipalityResponse } from "@/api/address.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { createUser, UserCreateData } from "@/api/user.api";


const BillingDataForm = () => {
    const { setIsLoading, showMessageError, setShowMessageError } = useStatusPageContext();
    const router = useRouter();
    const { userData, setUserData, deleteUserData } = useUserContext();
    const [states, setStates] = useState<StateResponse>([]);
    const [municipalities, setMunicipalities] = useState<MunicipalityResponse>([]);
    const [allMunicipalities, setAllMunicipalities] = useState<MunicipalityResponse>([]);
    const [isRegistered, setIsRegistered] = useState(false);
    var submited = false;

    const form = useForm<z.infer<typeof signUpBillinglDataSchema>>({
        resolver: zodResolver(signUpBillinglDataSchema),
        defaultValues: {
            postalCode: "",
            state: "",
            municipality: "",
            address: "",
            bankAccountNumber: "",
            expirationDateBankAccount: "",
        },
    });

    const validateFormData = () => {
        if (submited == false ) {
            if (!userData.firstName || !userData.email) {
                router.push('/signUp');
            }
        }
    };

    async function onSubmit(values: z.infer<typeof signUpBillinglDataSchema>) {

        const userCreateData: UserCreateData = {
            rfc: userData.rfc || "",
            bankAccountNumber: values.bankAccountNumber || "",
            expirationDateBankAccount: values.expirationDateBankAccount || "",
            licenseNumber: userData.licenseNumber || "",
            phone: userData.phoneNumber || "",
            name: userData.firstName || "",
            lastName: userData.lastName || "",
            datebirth: userData.birthDate || "",
            email: userData.email || "",
            password: userData.password || "",
            postalCode: values.postalCode || "",
            address: values.address || "",
            idMunicipality: +values.municipality || 0
        }

        try {
            const response = await createUser(userCreateData);

            if (response?.status === 201) {
                submited = true;
                setIsRegistered(true);
                setTimeout(() => {
                    router.push("/signIn");
                }, 3000);
                setTimeout(()=>{
                    deleteUserData();
                }, 2900);
            } else {
                setShowMessageError(true);
            }
        } catch (error) {
            setShowMessageError(true);
            setIsLoading(false);
        }


    };

    useEffect(() => {
        validateFormData();
    }, [userData]);

    useEffect(() => {
        setIsLoading(true);
        const fetchStates = async () => {
            try {
                const statesData = await getStates();
                if (statesData != null && statesData.length > 0) {
                    setStates(statesData);
                } else {
                    throw new Error("Error al recuperar los estados.");
                }

                const municipalitiesData = await getMunicipalities();
                if (municipalitiesData != null && municipalitiesData.length > 0) {
                    setAllMunicipalities(municipalitiesData); 
                } else {
                    throw new Error("Error al recuperar los municipios.");
                }

            } catch (err) {
                setShowMessageError(true);
            }
        };
        fetchStates();
    }, []);

    const onStateValueChanged = (value: string) => {
        setIsLoading(true);

        if (isNaN(+value)) {
            setIsLoading(false);
            return;
        }

        const filteredMunicipalities = allMunicipalities.filter(
            (municipality) => municipality.idState === +value
        );

        setMunicipalities(filteredMunicipalities);
        setIsLoading(false);
    };


    return (
        <Form {...form}>

            {isRegistered && (
                <div className="bg-green-500 text-white p-4 mb-4 text-center rounded-md font-semibold animate-fadeIn">
                    ¡Te has registrado exitosamente! Redirigiendo a la página de inicio de sesión...
                </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Código Postal</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Código Postal"
                                        {...field}
                                    />
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.postalCode?.message}</p>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            onStateValueChanged(value);
                                        }}
                                        defaultValue={userData?.stateId ? userData.stateId + "" : undefined}>

                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecciona un estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {states.map((state) => (
                                                <SelectItem key={state.idState} value={state.idState + ""}>
                                                    {state.stateName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.state?.message}</p>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bankAccountNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número de Cuenta Bancaria</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Número de Cuenta"
                                        {...field}
                                    />
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.bankAccountNumber?.message}</p>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="expirationDateBankAccount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de Expiración</FormLabel>
                                <FormControl>
                                    <Input
                                        type="month"
                                        placeholder="Fecha de Expiración"
                                        {...field}
                                    />
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.expirationDateBankAccount?.message}</p>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="municipality"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Municipio</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={userData?.municipalityId ? userData.municipalityId + "" : undefined}
                                    disabled={municipalities.length === 0} // Deshabilitar si no hay municipios
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona un municipio" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {municipalities.map((municipality) => (
                                            <SelectItem key={municipality.idMunicipality} value={municipality.idMunicipality + ""}>{municipality.municipalityName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <p className="text-red-500 text-sm">{form.formState.errors.municipality?.message}</p>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Dirección"
                                    {...field}
                                />
                            </FormControl>
                            <p className="text-red-500 text-sm">{form.formState.errors.address?.message}</p>
                        </FormItem>
                    )}
                />

                <br />

                <Button
                    type="submit"
                    className="w-full text-center flex justify-center mt-4 min-h-12 bg-darkBlue">
                    Terminar registro
                </Button>
            </form>
        </Form>
    );
};

export default BillingDataForm;
