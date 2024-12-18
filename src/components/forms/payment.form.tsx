"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import vehicleSchema from '@/schemas/vehicle.schema';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const PaymentForm = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof vehicleSchema>>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            brand: ""
        }
    });

    async function onSubmit(values: z.infer<typeof vehicleSchema>) {
        try {
            console.log(values);
            router.push('/dashboard/policyPlan/paymentsuccess');
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2 className='text-2xl font-semibold'>Información de pago</h2>
            <h4 className="text-alternGray">Ingrese la información para realizar el pago</h4>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >

                    <div className="grid grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Télefono de contacto" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        <FormItem className="mb-2">
                            <FormLabel>Método de pago</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Seleccione un método de pago" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Cuenta bancaria: 538957BNUIF8429427</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <div className="flex flex-row mb-2">
                                    <input
                                        type="radio"
                                        name="plan"
                                        className="mr-2 appearance-none w-6 h-6 border-2 border-darkBlue rounded-full checked:bg-darkBlue checked:border-darkBlue cursor-pointer"
                                    />
                                    <label>Pago único</label>
                                </div>
                                <div className="flex flex-row">
                                    <input
                                        type="radio"
                                        name="plan"
                                        className="mr-2 appearance-none w-6 h-6 border-2 border-darkBlue rounded-full checked:bg-darkBlue checked:border-darkBlue cursor-pointer"
                                    />
                                    <label>Pago mensuales</label>
                                </div>
                            </div>
                            <div>
                                <FormItem>
                                    <FormLabel>Pago cada</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccione un método de pago" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">1 mes</SelectItem>
                                                <SelectItem value="1">4 meses</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className="w-4/5 text-center flex justify-center mt-4 min-h-12 bg-darkBlue">
                                Finalizar compra
                            </Button>
                        </div>

                    </div>

                </form>
            </Form>
        </div>
    )
}

export default PaymentForm