"use client"

import reportSchema from "@/schemas/report.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { MapWrapper } from "@/app/(main)/dashboard/reports/mapWrapper";
import ImageUpload from "@/app/(main)/dashboard/reports/imageUpload";
import { ActivePolicyResponse, getAllActivePolicies } from "@/api/policy.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useStatusPageContext } from "@/lib/statusPage/statusContext";
import { ColorsVehicleResponse, getColorsVehicles } from "@/api/vehicle.api";
import { BrandsVehicleResponse, getBrandsVehicles } from "@/api/brand.api";
import React from "react";
import { createReport, CreateReportData } from "@/api/reports.api";


const ReportForm = () => {

    const [showMap, setShowMap] = useState(false);
    const { setIsLoading, showMessageError, setShowMessageError } = useStatusPageContext();
    const [activePolicies, setActivePolicies] = useState<ActivePolicyResponse[]>([]);
    const [colors, setColors] = useState<ColorsVehicleResponse>([]);
    const [brands, setBrands] = useState<BrandsVehicleResponse>([]);

    useEffect(() => {
        setIsLoading(true);

        try {
            fetchActivePolicies();
            fetchColors();
            fetchBrands();
        } catch (error) {
            setIsLoading(false);
            setShowMessageError(true);
        }

        setIsLoading(false)

    }, []);

    const fetchActivePolicies = async () => {
        const activePolicies = await getAllActivePolicies();

        if (activePolicies) {
            setActivePolicies(activePolicies);
        } else {
            throw new Error("Error al recuperar las polizas vigentes");
        }
    }

    const fetchColors = async () => {
        const colorsData = await getColorsVehicles();

        if (colorsData) {
            setColors(colorsData);
        } else {
            throw new Error("Error al recuperar los colores");
        }
    }

    const fetchBrands = async () => {
        const brandsData = await getBrandsVehicles();

        if (brandsData) {
            setBrands(brandsData);
        } else {
            throw new Error("Error al recuperar las marcas");
        }
    }

    const form = useForm<z.infer<typeof reportSchema>>({
        resolver: zodResolver(reportSchema),
        defaultValues: {
            location: {
                latitude: 0,
                longitude: 0
            }
        }
    });

    const onLocationSelect = useCallback((lat: number, lng: number) => {
        form.setValue('location.latitude', lat);
        form.setValue('location.longitude', lng);
        console.log(lat, lng);
    }, [form]);

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "involvedPeople"
    });

    async function onSubmit(values: z.infer<typeof reportSchema>) {
        const imagesWithDetails = values.images.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        }));

        const valuesWithImages = {
            ...values,
            images: imagesWithDetails
        }

        console.log(JSON.stringify(valuesWithImages, null, 2));

        const involvedPeopleWithDefaults = values.involvedPeople.map(person => ({
            name: person.name || "",
            brandId: parseInt(person.brandId!, 10) || 0,
            colorId: parseInt(person.colorId!, 10) || 0,
            plates: person.plates || ""
        }));

        const createReportData: CreateReportData = {
            serialNumber: values.vehicle,
            images: values.images,
            location: values.location,
            involvedPeople: involvedPeopleWithDefaults
        }

        await createReport(createReportData);
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
                                    <FormLabel>Poliza</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(value) => { { field.onChange(value); } }}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona una poliza" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    activePolicies.map((policy) => (
                                                        <SelectItem key={policy.serialNumber} value={policy.serialNumber}>{`${policy.Vehicle.Model.Brand.name} - ${policy.Vehicle.Color.vehicleColor} - ${policy.Vehicle.Model.year}`}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
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
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-1/2 flex flex-col flex-grow min-h-0">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Ubicación</FormLabel>
                                    <FormControl className="flex-1">
                                        <div className="p-4 border-lightGray border-[1px] rounded-md flex justify-center items-center h-[90%]">
                                            {showMap && (
                                                <MapWrapper
                                                    onLocationSelect={onLocationSelect}
                                                />
                                            )}

                                            {!showMap && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setShowMap(true)}
                                                    className="absolute"
                                                >
                                                    Obtener Ubicación
                                                </Button>
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
                                        name={`involvedPeople.${index}.brandId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Marca</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={(value) => { { field.onChange(value); } }}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Selecciona una marca" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {brands.map((brand) => (
                                                                <SelectItem key={brand.idBrand} value={brand.idBrand + ""}>{brand.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="w-1/2 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name={`involvedPeople.${index}.colorId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Color</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Seleccionar color" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {colors.map((color) => (
                                                                <SelectItem key={color.idColor} value={color.idColor + ""}>{color.vehicleColor}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
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
                            onClick={() => append({ name: "", brandId: "", colorId: "", plates: "" })}
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