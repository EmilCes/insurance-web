"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import signUpBillinglDataSchema from "@/schemas/signUpBillingData";
import { UserProvider, useUserContext } from "@/lib/context/userSignUpContext";
import { useRouter } from "next/navigation";
import React from "react";

const BillingDataForm = () => {
    const router = useRouter();
    const { userData, setUserData } = useUserContext();

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
        if (!userData.firstName || !userData.email) {
          router.push('/signUp');
        }
      };

    const onSubmit = (values: z.infer<typeof signUpBillinglDataSchema>) => {
        setUserData({
            postalCode: values.postalCode,
            state: values.state,
            municipality: values.municipality,
            address: values.address,
            bankAccountNumber: values.bankAccountNumber,
            expirationDateBankAccount: values.expirationDateBankAccount
        });

        router.push("/signUp/billingData/");
    };

    React.useEffect(() => {
        validateFormData();
      }, [userData]);

    return (
        <Form {...form}>
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
                                    <Input
                                        placeholder="Estado"
                                        {...field}
                                    />
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
                            <FormLabel>Colonia</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Colonia"
                                    {...field}
                                />
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
