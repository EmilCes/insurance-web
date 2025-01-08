"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStatusPageContext } from "@/lib/statusPage/statusContext";
import { useRouter } from "next/navigation";
import { dictumSchema } from "@/schemas/dictum.schema";
import { updateReportDictum } from "@/api/reports.api";
import ErrorMessage from "../errorMessage/errorMessage";
import Loading from "../loading/Loading";

interface DictamenFormProps {
    role: string;
    mode: "create" | "view";
    defaultValues?: any;
}

const DictumForm: React.FC<DictamenFormProps> = ({
    role,
    mode,
    defaultValues
}) => {
    const { isLoading, setIsLoading, showMessageError, setShowMessageError } =
        useStatusPageContext();
    const router = useRouter();

    const isAjustador = role === "Ajustador";
    const isViewMode = mode === "view";

    const dictamenExists =
        defaultValues?.dictumResult && defaultValues.dictumResult.trim() !== "";

    const form = useForm<z.infer<typeof dictumSchema>>({
        resolver: zodResolver(dictumSchema),
        defaultValues: {
            dictamen: defaultValues?.dictamen || "",
        },
    });

    const onSubmit = async (values: z.infer<typeof dictumSchema>) => {
        setIsLoading(true);

        try {
            const response = await updateReportDictum(defaultValues.reportNumber!, { result: values.dictamen });

            if (response) {
                window.location.reload();
            } else {
                setShowMessageError(true);
            }

        } catch (error) {
            console.error("Error al actualizar el dictamen:", error);
            setShowMessageError(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (isViewMode) {
        if (isAjustador) {
            if (!dictamenExists) {
                return (
                    <>
                        {isLoading && <Loading />}
                        {showMessageError && <ErrorMessage />}

                        <div className="mt-8">
                            <h2 className="font-semibold text-xl">Dictamen del Ajustador</h2>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="dictamen"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Genera el dictamen del reporte.</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Escribe el dictamen aquí"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <div className="mt-8 flex justify-end">
                                        <Button type="submit" className="bg-darkBlue ml-auto w-1/4">
                                            Enviar Dictamen
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </>


                );
            } else {
                return (
                    <div className="mt-8">
                        <h2 className="font-semibold text-xl">Dictamen del Ajustador</h2>
                        <h3 className="text-sm text-alternGray">Información del dictamen generado.</h3>
                        <div className="py-2">{defaultValues.dictumResult}</div>
                    </div>
                );
            }
        } else {
            return (
                <div className="mt-8">
                    <h2 className="font-semibold text-xl">Dictamen del Ajustador</h2>
                    <h3 className="text-sm text-alternGray">Información del dictamen generado.</h3>

                    <div className="py-2">
                        {dictamenExists
                            ? defaultValues.dictumResult
                            : "Sin dictamen generado"}
                    </div>

                </div>
            );
        }
    } else {
        return null;
    }
};

export default DictumForm;