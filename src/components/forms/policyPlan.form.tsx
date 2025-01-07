"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import policyPlanSchema from "@/schemas/policyPlan.schema";
import { z } from "zod";
import { useEffect, useState } from 'react';
import { createPolicyPlanData, getPolicyPlanData, PolicyPlanCreate, updatePolicyPlanData } from "@/api/policyplan.api";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";

interface PolicyPlanFormProps {
    idPolicyPlan: string;
}

const PolicyPlanForm: FC<PolicyPlanFormProps> = ({ idPolicyPlan }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof policyPlanSchema>>({
        resolver: zodResolver(policyPlanSchema),
        defaultValues: {
            title: "",
            description: "",
            maxPeriod: 0,
            basePrice: 0,
        },
    });

    const [errorMessage, setErrorMessage] = useState("");

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "service"
    });

    const addService = () => {
        append({ name: "", isCovered: false, coveredCost: 0 });
    };

    useEffect(() => {
        const services = form.getValues("service");

        if (services.length === 0) {
            form.setError("service", {
                type: "manual",
                message: "Debe haber al menos un servicio",
            });
        } else {
            form.clearErrors("service");
        }
    }, [fields]);

    useEffect(() => {
        const fetchPolicyPlanData = async () => {
            try {
                if (idPolicyPlan as string == "") {
                    form.setValue("title", "");
                    form.setValue("description", "");
                    form.setValue("maxPeriod", 0);
                    form.setValue("basePrice", 0);

                }
                else {
                    const response = await getPolicyPlanData(idPolicyPlan as string);
                    if (response) {
                        form.setValue("title", response.title);
                        form.setValue("description", response.description);
                        form.setValue("maxPeriod", response.maxPeriod);
                        form.setValue("basePrice", response.basePrice);
                        response.Service.forEach(service => {
                            append({
                                name: service.name,
                                isCovered: service.isCovered,
                                coveredCost: service.coveredCost,
                            });
                        });
                    } else {
                        setErrorMessage("No se pudo obtener el plan de póliza.");
                    }
                }
            } catch (error) {
                setErrorMessage("Hubo un error al cargar el plan de póliza.");
            }
        };

        fetchPolicyPlanData();
    }, []);

    function transformToCreateFormat(data: z.infer<typeof policyPlanSchema>): PolicyPlanCreate {
        return {
            title: data.title,
            description: data.description,
            maxPeriod: data.maxPeriod,
            basePrice: data.basePrice,
            service: data.service.map(service => ({
                name: service.name,
                isCovered: service.isCovered ?? false,
                coveredCost: service.coveredCost || 0,
            })),
        };
    }

    function validateCoveredCost(policyData: any) {
        let isValid = true;
        for (let [index, service] of policyData.service.entries()) {
            if (service.isCovered && service.coveredCost !== 0) {
                form.setError(`service.${index}.coveredCost`, {
                    type: "manual",
                    message: "El costo asegurado debe ser 0 cuando es amparada",
                });
                isValid = false;
            } else if (!service.isCovered && service.coveredCost === 0) {
                form.setError(`service.${index}.coveredCost`, {
                    type: "manual",
                    message: "El costo asegurado debe ser mayor a 0 cuando no es amparada",
                });
                isValid = false;
            } else {
                form.clearErrors(`service.${index}.coveredCost`);
            }
        }
        return isValid;
    }



    async function onSubmit(values: z.infer<typeof policyPlanSchema>) {
        try {
            console.log("submit");
            const policyData = transformToCreateFormat(values);
            let response;
            if (!validateCoveredCost(policyData)) {
                setErrorMessage("La validación de los datos falló. Por favor, revise los campos.");
                return;
            }
            if (idPolicyPlan as string == "") {
                response = await createPolicyPlanData(policyData);
            } else {
                response = await updatePolicyPlanData(policyData, idPolicyPlan as string);
            }
            if (response === null) {
                setErrorMessage("La solicitud falló. Por favor, intente nuevamente.");
                return;
            }
            if ('status' in response) {
                setErrorMessage(response.message);
            } else {
                setErrorMessage("");
                router.push(`/policyPlans/`);
            }
        } catch (error: any) {
            setErrorMessage("La solicitud falló. Por favor, intente nuevamente.");
        }
    }

    if (!router) {
        return null;
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"
            >

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Datos del plan de póliza</h3>
                            <h3 className="text-alternGray">Ingrese los datos para el nuevo plan de póliza.</h3>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm font-semibold">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border border-black-200 p-4 rounded">

                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Título de plan</FormLabel>
                                <FormControl>
                                    <Input placeholder="ex: Póliza de Seguro Vehicular Básico" {...field} />
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.title?.message}</p>
                            </FormItem>
                        )} />

                        <br className="hidden md:block" />

                        <FormField control={form.control} name="basePrice" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio base</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="ex: 15,000 pesos" {...field} />
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.basePrice?.message}</p>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="maxPeriod" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Plazo máximo</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="ex: 12 meses" {...field} />
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.maxPeriod?.message}</p>
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <textarea className="w-full p-2 border rounded" rows={4} placeholder="ex: Seguro completo para vehículos particulares." {...field}></textarea>
                                </FormControl>
                                <p className="text-red-500 text-sm">{form.formState.errors.description?.message}</p>
                            </FormItem>
                        )} />

                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Servicios de póliza</h3>
                    <h3 className="text-alternGray">Ingrese los datos de los servicios que cubre el nuevo plan de póliza.</h3>
                    <div className="mb-6 border border-black-200 p-4 rounded overflow-auto max-h-96 max-w-full">
                        <table className="w-full border-collapse border border-gray-300 min-w-[550px]">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Nombre</th>
                                    <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Coste asegurado</th>
                                    <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Es amparada</th>
                                    <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map((service, index) => (
                                    <tr key={service.id}>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <FormField
                                                control={form.control}
                                                name={`service.${index}.name`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input placeholder="ex: Gastos Médicos Ocupantes" {...field} />
                                                        </FormControl>
                                                        <p className="text-red-500 text-sm">{form.formState.errors?.service?.[index]?.name?.message}</p>
                                                    </FormItem>
                                                )}
                                            />
                                        </td>

                                        <td className="border border-gray-300 px-4 py-2">
                                            <FormField
                                                control={form.control}
                                                name={`service.${index}.coveredCost`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input type="number" placeholder="ex: 1625" {...field} />
                                                        </FormControl>
                                                        <p className="text-red-500 text-sm">{form.formState.errors?.service?.[index]?.coveredCost?.message}</p>
                                                    </FormItem>
                                                )}
                                            />
                                        </td>

                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <FormField
                                                control={form.control}
                                                name={`service.${index}.isCovered`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={(checked: boolean) => {
                                                                    field.onChange(checked);
                                                                    if (checked) {
                                                                        form.setValue(`service.${index}.coveredCost`, 0);
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        </td>

                                        <td className="py-2 flex justify-center ">
                                            <Button className="px-10 bg-red-500 text-white" onClick={() => remove(index)}>Eliminar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br />
                        <Button className="bg-green-500 text-white w-full" onClick={(e) => { e.preventDefault(); addService(); }}>Agregar otro servicio</Button>
                        {form.formState.errors.service && form.formState.errors.service.message && (
                            <p className="text-red-500 text-sm mt-4">{form.formState.errors.service.message}</p>
                        )}
                    </div>
                </div>
                <Button type="submit" className="bg-darkBlue text-white px-20 py-3 rounded-md float-right mr-1" style={{ marginBottom: '20px' }}>Guardar</Button>
                <br />
                <br />

            </form>
        </Form>)
};

export default PolicyPlanForm;