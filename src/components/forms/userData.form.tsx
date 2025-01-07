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
    const [accountInfo, setAccountInfo] = useState<userDataResponse>();

    const handleEditClick = () => {
        router.push('user/modify/');
    };

    const form = useForm<z.infer<typeof userDataSchema>>({
        resolver: zodResolver(userDataSchema)
    });

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const accountInfoData = await getUserData();
                if (accountInfoData != null) {
                    setAccountInfo(accountInfoData);
                } else {
                    throw new Error("Error al recuperar datos usuario");
                }
            } catch (error) {
                setShowMessageError(true);
            }
            setIsLoading(false);
        };
        fetchPlans();
    }, []);

    return (
        <div>
            {isLoading ? (<Loading></Loading>) : (<></>)}
            {showMessageError ? (<ErrorMessage></ErrorMessage>) : (<></>)}

            <div className="space-y-4 w-full">
                <h2 className="text-xl font-semibold">Datos de usuario</h2>
                <Form{...form}>
                    <div className="grid grid-cols-4 gap-4">
                        <FormField
                            name="firstName"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.name} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="lastName"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.lastName} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="birthDate"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Fecha de Nacimiento</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.datebirth} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="licenseNumber"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Número de Licencia</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.licenseNumber} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="rfc"
                            render={() => (
                                <FormItem>
                                    <FormLabel>RFC</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.rfc} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Correo Electrónico</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.email} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="phoneNumber"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Número de Teléfono</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.phone} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="address"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Dirección</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.address} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="postalCode"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Código Postal</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.postalCode} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="bankAccountNumber"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Número de Cuenta Bancaria</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.bankAccountNumber} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="expirationDateBankAccount"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Vencimiento de Cuenta Bancaria</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.expirationDateBankAccount} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="state"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.state} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="municipality"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Municipio</FormLabel>
                                    <FormControl>
                                        <Input value={accountInfo?.municipality} readOnly />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </Form>

                <br />
                <div className="flex">
                    <Button
                        onClick={handleEditClick}
                        className="w-1/4 mt-4 bg-blue-500 text-white ml-auto"
                    >
                        Editar Datos
                    </Button>
                </div>


            </div>
        </div>
    );
};

export default DisplayUserData;
