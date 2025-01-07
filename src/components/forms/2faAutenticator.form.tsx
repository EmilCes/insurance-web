"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/login.api";
import { useAuth } from "@/lib/auth/authContext";

const twoFaSchema = z.object({
    authCode: z.string().min(6, "El código debe tener al menos 6 caracteres"),
});

const TwoFactorFormAuthenticator = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof twoFaSchema>>({
        resolver: zodResolver(twoFaSchema),
        defaultValues: {
            authCode: "",
        },
    });

    async function onSubmit(values: z.infer<typeof twoFaSchema>) {
        try {
            const email = localStorage.getItem("email");
            const password = localStorage.getItem("password");

            if (!email) {
                throw new Error("No email found in localStorage");
            }

            if (!password) {
                throw new Error("No password found in localStorage");
            }

            const valuesToSend = {
                email: email,
                password: password,
                twoFactorAuthenticationCode: values.authCode,
            };

            const result = await loginUser(valuesToSend);

            if (result === null) {
                setErrorMessage("El código de autenticación es incorrecto.");
                return;
            } else {
                setErrorMessage(null);
                login(result.access_token);
                localStorage.removeItem("password");
                localStorage.removeItem("email");

                router.push("/dashboard");
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="authCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código de autenticación</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Ingresa el código"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {errorMessage && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}

                <Button
                    type="submit"
                    className="w-full text-center flex justify-center mt-4 min-h-12 bg-darkBlue"
                >
                    Verificar código
                </Button>
            </form>
        </Form>
    );
};

export default TwoFactorFormAuthenticator;
