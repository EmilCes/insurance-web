"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import ErrorMessage from '@/components/errorMessage/errorMessage';
import Loading from '@/components/loading/Loading';
import { getStates, getMunicipalities } from "@/api/address.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getUserData, userDataResponse, UserUpdateData, updateUser } from "@/api/user.api";
import { z } from "zod";
import { useStatusPageContext } from '@/lib/statusPage/statusContext';
import userDataSchema from "@/schemas/userData.schema";
import { StateResponse, MunicipalityResponse } from "@/api/address.api";
import { useUserContext } from "@/lib/context/userSignUpContext";


const ModifyUser = () => {
    const router = useRouter();
    const { isLoading, showMessageError, setShowMessageError, setIsLoading } = useStatusPageContext();
    const { userData, setUserData, deleteUserData } = useUserContext();
    const [accountInfo, setAccountInfo] = useState<userDataResponse>();
    const [states, setStates] = useState<StateResponse>([]);
    const [municipalities, setMunicipalities] = useState<MunicipalityResponse>([]);
    const [allMunicipalities, setAllMunicipalities] = useState<MunicipalityResponse>([]);

    const form = useForm<z.infer<typeof userDataSchema>>({
        resolver: zodResolver(userDataSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            birthDate: '',
            licenseNumber: '',
            rfc: '',
            email: '',
            phoneNumber: '',
            address: '',
            postalCode: '',
            bankAccountNumber: '',
            expirationDateBankAccount: '',
            state: '',
            municipality: '',
        },
    });

    const handleEditClick = () => {
        router.back();
    };

    async function handleSaveClick(values: z.infer<typeof userDataSchema>) {
        try {
            setIsLoading(true);

            const userUpdateData: UserUpdateData = {
                licenseNumber: values.licenseNumber,
                phone: values.phoneNumber,
                address: values.address,
                postalCode: values.postalCode,
                bankAccountNumber: values.bankAccountNumber,
                expirationDateBankAccount: values.expirationDateBankAccount,
                idMunicipality: +values.municipality
            };

            const response = await updateUser(values.email, userUpdateData);

            if (response) {
                setShowMessageError(false);
                router.push('../user');
            } else {
                setShowMessageError(true);
            }
        } catch (error) {
            setShowMessageError(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accountInfoData = await getUserData();
                if (accountInfoData != null) {
                    setAccountInfo(accountInfoData);

                    if (accountInfoData) {
                        form.setValue('firstName', accountInfoData.name || '');
                        form.setValue('lastName', accountInfoData.lastName || '');
                        form.setValue('birthDate', accountInfoData.datebirth || '');
                        form.setValue('licenseNumber', accountInfoData.licenseNumber || '');
                        form.setValue('rfc', accountInfoData.rfc || '');
                        form.setValue('email', accountInfoData.email || '');
                        form.setValue('phoneNumber', accountInfoData.phone || '');
                        form.setValue('address', accountInfoData.address || '');
                        form.setValue('postalCode', accountInfoData.postalCode || '');
                        form.setValue('bankAccountNumber', accountInfoData.bankAccountNumber || '');
                    }
                } else {
                    throw new Error("Error al recuperar datos del usuario");
                }
            } catch (error) {
                setShowMessageError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

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
        <div>
            {isLoading ? <Loading /> : null}
            {showMessageError ? <ErrorMessage /> : null}

            <div className="space-y-4 w-full">
                <h2 className="text-xl font-semibold">Datos de usuario</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSaveClick)} className="space-y-2">
                        <div className="p-4 border-lightGray border-[1px] rounded-md">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField name="firstName" render={() => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input {...form.register('firstName')} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField name="lastName" render={() => (
                                    <FormItem>
                                        <FormLabel>Apellido</FormLabel>
                                        <FormControl>
                                            <Input {...form.register('lastName')} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField name="birthDate" render={() => (
                                    <FormItem>
                                        <FormLabel>Fecha de Nacimiento</FormLabel>
                                        <FormControl>
                                            <Input {...form.register('birthDate')} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField name="licenseNumber" render={() => (
                                    <FormItem>
                                        <FormLabel>Número de Licencia</FormLabel>
                                        <FormControl>
                                            <Input {...form.register('licenseNumber')} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField name="rfc" render={() => (
                                    <FormItem>
                                        <FormLabel>RFC</FormLabel>
                                        <FormControl>
                                            <Input {...form.register('rfc')} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField name="email" render={() => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <FormControl>
                                            <Input {...form.register('email')} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField name="phoneNumber" render={() => (
                                    <FormItem>
                                        <FormLabel>Número de Teléfono</FormLabel>
                                        <FormControl>
                                            <Input {...form.register('phoneNumber')} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        <br />
                        <hr className="h-0.5 bg-slate-400 mt-4 mb-4" />
                        <br />

                        <h2 className="text-xl font-semibold">Datos de pago</h2>
                        <div className="p-4 border-lightGray border-[1px] rounded-md">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField name="address" render={() => (
                                    <FormItem>
                                        <FormLabel>Dirección</FormLabel>
                                        <FormControl>
                                            <Input {...form.register('address')} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField name="postalCode" render={() => (
                                    <FormItem>
                                        <FormLabel>Código Postal</FormLabel>
                                        <FormControl>
                                            <Input {...form.register('postalCode')} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                                <FormField name="bankAccountNumber" render={() => (
                                    <FormItem>
                                        <FormLabel>Número de Cuenta Bancaria</FormLabel>
                                        <FormControl>
                                            <Input {...form.register('bankAccountNumber')} />
                                        </FormControl>
                                    </FormItem>
                                )} />
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
                                                    defaultValue={""}>
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
                                    name="municipality"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Municipio</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={accountInfo?.municipality ? accountInfo.municipality + "" : undefined}
                                                    disabled={municipalities.length === 0}
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
                            </div>
                        </div>

                        <br />
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-darkBlue ml-auto w-full sm:w-1/2 lg:w-1/4">Guardar Cambios</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>

    );
};

export default ModifyUser;
