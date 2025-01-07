"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import loginSchema from "@/schemas/login.schema";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/login.api";
import { useAuth } from "@/lib/auth/authContext";


const LoginForm = () => {

    const router = useRouter();
    const { login } = useAuth();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            console.log(values);
            const response = await loginUser(values);

            if (response === null) {
                console.log("Error");
                return;
            }
            
            login(response.access_token);
            router.push('/dashboard');


        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo</FormLabel>
                            <FormControl>
                                <Input placeholder="Correo electrónico" {...field} />
                            </FormControl>
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
                                <Input type="password" placeholder="Contraseña" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <br></br>

                <Button
                    type="submit"
                    className="w-full text-center flex justify-center mt-4 min-h-12 bg-darkBlue">
                    Iniciar Sesión
                </Button>

            </form>
        </Form>
    )
}

export default LoginForm;

