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


const LoginForm = () => {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    });

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values);
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

