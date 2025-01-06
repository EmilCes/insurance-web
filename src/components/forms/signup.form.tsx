"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { z } from "zod"
import { checkEmailExists, checkLicenseExists, checkRfcExists } from "@/api/user.api";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import signUpSchemaPersonalData from "@/schemas/signUpPersonalData.schema";
import { UserProvider, useUserContext } from "@/lib/context/userSignUpContext";
import { useRouter } from "next/navigation";


const SignUpForm = () => {

    const router = useRouter();
    const { userData, setUserData } = useUserContext();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const form = useForm<z.infer<typeof signUpSchemaPersonalData>>({
        resolver: zodResolver(signUpSchemaPersonalData),
        defaultValues: {
            firstName: "",
            lastName: "",
            birthDate: "",
            licenseNumber: "",
            rfc: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: ""
        }
    });

    async function validateData(email: string, licenseNumber: string, rfc: string) {
        let flag = true;

        const emailResponse = await checkEmailExists(email);
        const rfcResponse = await checkRfcExists(rfc);
        const licenseResponse = await checkLicenseExists(licenseNumber);

        if (emailResponse) {
            form.setError("email", {
                type: "manual",
                message: "Este correo electrónico ya está registrado.",
            });
            flag = false;
        }

        if (rfcResponse) {
            form.setError("rfc", {
                type: "manual",
                message: "Este RFC ya está registrado.",
            });
            flag = false;
        }

        if (licenseResponse) {
            form.setError("licenseNumber", {
                type: "manual",
                message: "Este número de licencia ya está registrado.",
            });
            flag = false;
        }

        return flag;
    }

    async function onSubmit(values: z.infer<typeof signUpSchemaPersonalData>) {
        try {
            const isValid = validateData(values.email, values.licenseNumber, values.rfc); await checkEmailExists(values.email);
            if (await isValid == true) {
                setUserData({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    birthDate: values.birthDate,
                    licenseNumber: values.licenseNumber,
                    rfc: values.rfc,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    password: values.password
                });

                router.push('/signUp/billingData/');
            }
        } catch (err) {
            console.log(err);
            setErrorMessage('Hubo un problema al verificar el correo. Por favor, inténtalo de nuevo.');
        }

    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre(s)" {...field} />
                                    </FormControl>
                                    <p className="text-red-500 text-sm">{form.formState.errors.firstName?.message}</p>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Apellido(s)" {...field} />
                                    </FormControl>
                                    <p className="text-red-500 text-sm">{form.formState.errors.lastName?.message}</p>
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de Nacimiento</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        placeholder="Selecciona una fecha"
                                        {...field}
                                    />
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.birthDate?.message}</p>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="licenseNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número de licencia</FormLabel>
                                <FormControl>
                                    <Input
                                        type="string"
                                        placeholder="Número de licencia"
                                        {...field}
                                    />
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.licenseNumber?.message}</p>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rfc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>RFC</FormLabel>
                                <FormControl>
                                    <Input
                                        type="string"
                                        placeholder="RFC"
                                        {...field}
                                    />
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.rfc?.message}</p>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número de telefono</FormLabel>
                                <FormControl>
                                    <Input
                                        type="string"
                                        placeholder="Ingresa tu número de telefono"
                                        {...field}
                                    />
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.phoneNumber?.message}</p>
                            </FormItem>
                        )}
                    />

                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Ingresa tu correo electrónico"
                                    {...field}
                                />
                            </FormControl>
                            <p className="text-red-500 text-sm">{form.formState.errors.email?.message}</p>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    {...field}
                                />
                            </FormControl>
                            <p className="text-red-500 text-sm">{form.formState.errors.password?.message}</p>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirmar Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirma tu contraseña"
                                    {...field}
                                />
                            </FormControl>
                            <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword?.message}</p>
                        </FormItem>
                    )}
                />

                <br />

                <Button
                    type="submit"
                    className="w-full text-center flex justify-center mt-4 min-h-12 bg-darkBlue">
                    Registrarse
                </Button>
            </form>
        </Form>
    );
};

export default SignUpForm;
