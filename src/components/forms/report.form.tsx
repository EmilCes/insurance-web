"use client"

import reportSchema from "@/schemas/report.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { number, z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import LocationMap from "@/app/(main)/dashboard/reports/map";
import { MapWrapper } from "@/app/(main)/dashboard/reports/mapWrapper";
import ImageUpload from "@/app/(main)/dashboard/reports/imageUpload";


const ReportForm = () => {

    const [showMap, setShowMap] = useState(false);

    const form = useForm<z.infer<typeof reportSchema>>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            location: {
                latitude: 0,
                longitude: 0
            }
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "involvedPeople"
    });

    async function onSubmit(values: z.infer<typeof reportSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex space-x-8 my-6 items-stretch mb-8">

                    <div className="w-1/2 space-y-4 flex flex-col justify-between">
                        <FormField
                            control={form.control}
                            name="vehicle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vehiculo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Vehiculo" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Imagenes del siniestro</FormLabel>
                                    <FormControl>
                                        <div className="p-4 border-lightGray border-[1px] rounded-md flex justify-center items-center h-52">
                                            <ImageUpload
                                                onFilesChange={(files) => {
                                                    form.setValue('images', files);
                                                }}
                                            />
                                            {/*<Button
                                                variant="outline"
                                                onClick={() => append({ name: "", brand: "", color: "", plates: "" })}
                                            >
                                                Subir Imagen
                                            </Button>*/}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-1/2 flex flex-col flex-grow min-h-0">
                        <FormField
                            control={form.control}
                            name="vehicle"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Ubicación</FormLabel>
                                    <FormControl className="flex-1">
                                        <div className="p-4 border-lightGray border-[1px] rounded-md flex justify-center items-center h-[90%]">

                                            {!showMap ? (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setShowMap(true)}
                                                >
                                                    Obtener Ubicación
                                                </Button>
                                            ) : (
                                                <MapWrapper
                                                    visible={showMap}
                                                    onLocationSelect={(lat: number, lng: number) => {
                                                        form.setValue('location.latitude', lat);
                                                        form.setValue('location.longitude', lng);
                                                        console.log(lat, lng)
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <div>
                        <h2 className="font-semibold text-xl">Datos de conductores involucrados</h2>
                        <h3 className="text-sm text-alternGray">Ingrese los datos de los conductores involucrados para agilizar el proceso.</h3>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="p-4 mt-4 border-lightGray border-[1px] rounded-lg">
                            <h2 className="text-xl">Conductor #1{index + 1}</h2>
                            <div className="flex space-x-8 mt-2">
                                <div className="w-1/2 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name={`involvedPeople.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre del conductor</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nombre" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`involvedPeople.${index}.brand`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Marca</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Marca del vehiculo" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="w-1/2 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name={`involvedPeople.${index}.color`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Color</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Color del vehiculo" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`involvedPeople.${index}.plates`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Placas</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Placas" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 mt-4">
                                <Checkbox id="anonymousDriver" />
                                <label
                                    htmlFor="anonymousDriver"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    ¿Conductor anónimo?
                                </label>
                            </div>
                        </div>
                    ))}


                    <div className="mt-4">
                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={() => append({ name: "", brand: "", color: "", plates: "" })}
                        >
                            Agregar conductor
                        </Button>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <Button className="bg-darkBlue ml-auto w-1/4">Crear Reporte</Button>
                </div>
            </form>
        </Form>
    )
}

export default ReportForm;