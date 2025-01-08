"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import ErrorMessage from '@/components/errorMessage/errorMessage';
import Loading from '@/components/loading/Loading';
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
import { getUserData, userDataResponse } from "@/api/user.api";
import { z } from "zod";
import { useStatusPageContext } from '@/lib/statusPage/statusContext';
import userDataSchema from "@/schemas/userData.schema";

const DisplayUserData = () => {
    const router = useRouter();
    const { isLoading, showMessageError, setShowMessageError, setIsLoading } = useStatusPageContext();
    const [accountInfo, setAccountInfo] = useState<userDataResponse | null>(null);

    const handleEditClick = () => {
        router.push('user/modify/');
    };

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

    useEffect(() => {
        const fetchPlans = async () => {
            setIsLoading(true);
            try {
                const accountInfoData = await getUserData();
                if (accountInfoData != null) {
                    setAccountInfo(accountInfoData);
                    form.reset({
                        firstName: accountInfoData.name || '',
                        lastName: accountInfoData.lastName || '',
                        birthDate: accountInfoData.datebirth || '',
                        licenseNumber: accountInfoData.licenseNumber || '',
                        rfc: accountInfoData.rfc || '',
                        email: accountInfoData.email || '',
                        phoneNumber: accountInfoData.phone || '',
                        address: accountInfoData.address || '',
                        postalCode: accountInfoData.postalCode || '',
                        bankAccountNumber: accountInfoData.bankAccountNumber || '',
                        expirationDateBankAccount: accountInfoData.expirationDateBankAccount || '',
                        state: accountInfoData.state || '',
                        municipality: accountInfoData.municipality || '',
                    });
                } else {
                    throw new Error("Error al recuperar datos usuario");
                }
            } catch (error) {
                setShowMessageError(true);
            }
            setIsLoading(false);
        };
        fetchPlans();
    }, [form, setIsLoading, setShowMessageError]);

    return (
        <div>
            {isLoading && <Loading />}
            {showMessageError && <ErrorMessage />}

            <div className="space-y-4 w-full">
                <h2 className="text-xl font-semibold">Datos de usuario</h2>
                <Form {...form}>
                    <div className="p-4 border-lightGray border-[1px] rounded-md">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {/* Nombre */}
                            <FormField
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* Apellido */}
                            <FormField
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Apellido</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* Fecha de Nacimiento */}
                            <FormField
                                name="birthDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de Nacimiento</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* Número de Licencia */}
                            <FormField
                                name="licenseNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Licencia</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* RFC */}
                            <FormField
                                name="rfc"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RFC</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* Correo Electrónico */}
                            <FormField
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* Número de Teléfono */}
                            <FormField
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número de Teléfono</FormLabel>
                                        <FormControl>
                                            <Input {...field} readOnly />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <hr className="h-0.5 bg-slate-400 mt-4 mb-4" />

                        <h2 className="text-xl font-semibold">Datos de pago</h2>

                        <div className="p-4 border-lightGray border-[1px] rounded-md">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {/* Dirección */}
                                <FormField
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dirección</FormLabel>
                                            <FormControl>
                                                <Input {...field} readOnly />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {/* Código Postal */}
                                <FormField
                                    name="postalCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Código Postal</FormLabel>
                                            <FormControl>
                                                <Input {...field} readOnly />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {/* Número de Cuenta Bancaria */}
                                <FormField
                                    name="bankAccountNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número de Cuenta Bancaria</FormLabel>
                                            <FormControl>
                                                <Input {...field} readOnly />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {/* Vencimiento de Cuenta Bancaria */}
                                <FormField
                                    name="expirationDateBankAccount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vencimiento de Cuenta Bancaria</FormLabel>
                                            <FormControl>
                                                <Input {...field} readOnly />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {/* Estado */}
                                <FormField
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estado</FormLabel>
                                            <FormControl>
                                                <Input {...field} readOnly />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {/* Municipio */}
                                <FormField
                                    name="municipality"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Municipio</FormLabel>
                                            <FormControl>
                                                <Input {...field} readOnly />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </Form>

                <div className="flex justify-end">
                    <Button onClick={handleEditClick} className="mt-4 bg-blue-500 text-white">
                        Editar Datos
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DisplayUserData;