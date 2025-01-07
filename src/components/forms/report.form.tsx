"use client"

import reportSchema from "@/schemas/report.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { MapWrapper } from "@/app/(main)/dashboard/reports/create/mapWrapper";
import ImageUpload from "@/app/(main)/dashboard/reports/create/imageUpload";
import { ActivePolicyResponse, getAllActivePolicies } from "@/api/policy.api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useStatusPageContext } from "@/lib/statusPage/statusContext";
import { ColorsVehicleResponse, getColorsVehicles } from "@/api/vehicle.api";
import { BrandsVehicleResponse, getBrandsVehicles } from "@/api/brand.api";
import React from "react";
import { createReport, CreateReportData, DetailedReportData } from "@/api/reports.api";
import { useRouter } from "next/navigation";
import Loading from "../loading/Loading";
import ErrorMessage from "../errorMessage/errorMessage";
import { Separator } from "../ui/separator";


const ReportForm = ({ mode = 'create', role, defaultValues }: { mode?: 'create' | 'view'; role: string, defaultValues?: DetailedReportData }) => {

    const { isLoading, setIsLoading, showMessageError, setShowMessageError } = useStatusPageContext();
    const router = useRouter();

    const [showMap, setShowMap] = useState(mode === 'view');
    const [activePolicies, setActivePolicies] = useState<ActivePolicyResponse[]>([]);
    const [colors, setColors] = useState<ColorsVehicleResponse>([]);
    const [brands, setBrands] = useState<BrandsVehicleResponse>([]);

    const isReadOnly = mode === 'view';
    const imageUrls = defaultValues?.photographs.map(photo => photo.url) || [];

    useEffect(() => {
        setIsLoading(true);

        try {
            if (!isReadOnly) {
                fetchActivePolicies();
                fetchColors();
                fetchBrands();
            }
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
        resolver: isReadOnly ? undefined : zodResolver(reportSchema),
        defaultValues: defaultValues ? {
            vehicle: defaultValues.vehicle.serialNumberVehicle,
            location: {
                latitude: parseFloat(defaultValues.latitude),
                longitude: parseFloat(defaultValues.longitude)
            },
            involvedPeople: defaultValues.implicateParties.map(party => ({
                name: party.name,
                brand: party.brand,
                color: party.color,
                plates: party.plates
            })),
            images: []
        } : {
            location: {
                latitude: 0,
                longitude: 0
            },
            involvedPeople: [
                {
                    name: "",
                    brandId: "",
                    colorId: "",
                    plates: ""
                }
            ],
            images: []
        }
    });

    const formRef = useRef(form);

    const onLocationSelect = useCallback((lat: number, lng: number) => {
        formRef.current.setValue('location.latitude', lat);
        formRef.current.setValue('location.longitude', lng);
    }, []);

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "involvedPeople"
    });

    async function onSubmit(values: z.infer<typeof reportSchema>) {
        setIsLoading(true);

        const nonEmptyInvolvedPeople = values.involvedPeople.filter(person => {
            return (
                (person.name && person.name.trim() !== '') ||
                (person.brandId && person.brandId !== '') ||
                (person.colorId && person.colorId !== '') ||
                (person.plates && person.plates.trim() !== '')
            );
        });

        if (nonEmptyInvolvedPeople.length === 0) {
            setIsLoading(false);
            form.setError('involvedPeople', {
                type: 'manual'
            });
            return;
        }

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

        try {
            const response = await createReport(createReportData);

            if (response && response.reportNumber) {
                router.push(`/dashboard/reports/success?reportNumber=${response.reportNumber}`);
            } else {
                setShowMessageError(true);
            }

        } catch (error) {
            setIsLoading(false);
            setShowMessageError(true);
            console.log('Error al crear el reporte: ', error);
        }


    }

    return (
        <>

            {isLoading && <Loading />}
            {showMessageError && <ErrorMessage />}

            <div>
                <h2 className="font-semibold text-xl">Información del reporte</h2>
                <h3 className="text-sm text-alternGray">Información del reporte generado.</h3>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    {
                        (role === "Ajustador" && mode === "view") && (
                            <>
                                <div className="flex flex-col mt-4 mb-4">
                                    <div className="flex space-x-8 mt-4">
                                        <div className="w-1/3 space-y-4">
                                            <div>
                                                <h3 className="text-sm text-alternGray">Fecha del reporte</h3>
                                                {defaultValues?.date}
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-alternGray">Nombre del conductor</h3>
                                                {defaultValues?.driver.name}
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-alternGray">Email del conductor</h3>
                                                {defaultValues?.driver.email}
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-alternGray">Teléfono del conductor</h3>
                                                {defaultValues?.driver.phone}
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-alternGray">Número de licencia</h3>
                                                {defaultValues?.driver.licenseNumber}
                                            </div>
                                        </div>

                                        <div className="w-1/3 space-y-4">
                                            <div>
                                                <h3 className="text-sm text-alternGray">Placas</h3>
                                                {defaultValues?.vehicle.plates}
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-alternGray">Marca del vehículo</h3>
                                                {defaultValues?.vehicle.brand}
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-alternGray">Color del vehículo</h3>
                                                {defaultValues?.vehicle.color}
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-alternGray">Número de serie</h3>
                                                {defaultValues?.vehicle.serialNumberVehicle}
                                            </div>
                                            <div>
                                                <h3 className="text-sm text-alternGray">Plan de póliza</h3>
                                                {defaultValues?.policy.policyPlan.title}
                                            </div>


                                        </div>

                                        <div className="w-1/3 space-y-4">
                                            <div>
                                                <h3 className="text-sm text-alternGray">Número de póliza</h3>
                                                {defaultValues?.policy.serialNumber}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <Separator />
                            </>

                        )
                    }

                    <div className="flex space-x-8 my-6 items-stretch mb-8">

                        <div className="w-1/2 space-y-4 flex flex-col justify-between">

                            <FormField
                                control={form.control}
                                name="vehicle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Poliza</FormLabel>
                                        <FormControl>
                                            {
                                                isReadOnly ? (
                                                    <div className="py-2">
                                                        {
                                                            defaultValues
                                                                ? `${defaultValues.vehicle.brand} - ${defaultValues.vehicle.color} - ${defaultValues.vehicle.modelYear}`
                                                                : ''
                                                        }
                                                    </div>
                                                ) : (

                                                    <Select disabled={isReadOnly} onValueChange={(value) => { { field.onChange(value); } }} value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Selecciona una poliza" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {
                                                                activePolicies.map((policy, id) => (
                                                                    <React.Fragment key={id}>
                                                                        <SelectItem value={policy.serialNumber}>{`${policy.Vehicle.Model.Brand.name} - ${policy.Vehicle.Color.vehicleColor} - ${policy.Vehicle.Model.year}`}</SelectItem>
                                                                    </React.Fragment>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>

                                                )
                                            }
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
                                                    urls={imageUrls}
                                                    readOnly={isReadOnly}
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
                                                        initialLatitude={form.getValues('location.latitude')}
                                                        initialLongitude={form.getValues('location.longitude')}
                                                        readOnly={isReadOnly}
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
                            <h3 className="text-sm text-alternGray">
                                {isReadOnly ?
                                    "Datos de conductores involucrados registrados."
                                    : "Ingrese los datos de los conductores involucrados para agilizar el proceso. Incluye toda la información que tengas."}
                            </h3>
                        </div>

                        {isReadOnly ? (
                            defaultValues?.implicateParties.map((party, index) => (
                                <div key={index} className="p-4 mt-4 border-lightGray border-[1px] rounded-lg">
                                    <h2 className="text-xl">Conductor #{index + 1}</h2>
                                    <div className="flex space-x-8 mt-2">
                                        <div className="w-1/2 space-y-4">
                                            <FormItem>
                                                <FormLabel>Nombre del conductor</FormLabel>
                                                <FormControl>
                                                    <div className="py-2">
                                                        {party.name}
                                                    </div>
                                                </FormControl>
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Marca</FormLabel>
                                                <FormControl>
                                                    <div className="py-2">
                                                        {party.brand}
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        </div>

                                        <div className="w-1/2 space-y-4">
                                            <FormItem>
                                                <FormLabel>Color</FormLabel>
                                                <FormControl>
                                                    <div className="py-2">
                                                        {party.color}
                                                    </div>
                                                </FormControl>
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Placas</FormLabel>
                                                <FormControl>
                                                    <div className="py-2">
                                                        {party.plates}
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                {fields.map((item, index) => (
                                    <div key={index} className="p-4 mt-4 border-lightGray border-[1px] rounded-lg relative">
                                        <h2 className="text-xl">Conductor #{index + 1}</h2>
                                        {
                                            index !== 0 && (
                                                <Button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="absolute top-2 right-2 text-red-500 bg-transparent hover:bg-red-500 hover:text-white"
                                                >
                                                    X
                                                </Button>
                                            )
                                        }


                                        <div className="flex space-x-8 mt-2">
                                            <div className="w-1/2 space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name={`involvedPeople.${index}.name`}
                                                    render={({ field: inputField }) => (
                                                        <FormItem>
                                                            <FormLabel>Nombre del conductor ("Anónimo" si se desconoce)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Nombre"
                                                                    name={inputField.name}
                                                                    value={inputField.value}
                                                                    onChange={inputField.onChange}
                                                                    onBlur={inputField.onBlur}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name={`involvedPeople.${index}.brandId`}
                                                    render={({ field: inputField }) => (
                                                        <FormItem>
                                                            <FormLabel>Marca</FormLabel>
                                                            <FormControl>
                                                                <Select onValueChange={inputField.onChange} value={inputField.value}>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Selecciona una marca" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {brands.map((brand) => (
                                                                            <React.Fragment key={brand.idBrand}>
                                                                                <SelectItem value={brand.idBrand + ""}>{brand.name}</SelectItem>
                                                                            </React.Fragment>
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
                                                                <Select onValueChange={field.onChange} value={field.value}>
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
                                                            <FormLabel>Placas ("XXXXXXX" si se desconoce)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Placas"
                                                                    name={field.name}
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    onBlur={field.onBlur}
                                                                />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                ))}

                                {
                                    fields.length < 4 && (
                                        <div className="mt-4">
                                            <Button
                                                disabled={isReadOnly}
                                                type="button"
                                                className="w-full"
                                                variant="outline"
                                                onClick={() => append({ name: "", brandId: "", colorId: "", plates: "" })}
                                            >
                                                Agregar conductor
                                            </Button>
                                        </div>
                                    )
                                }

                            </>
                        )}

                    </div>

                    {
                        mode === 'create' && (
                            <div className="mt-8 flex justify-end">
                                <Button className="bg-darkBlue ml-auto w-1/4">Crear Reporte</Button>
                            </div>
                        )
                    }

                </form >
            </Form >
        </>
    )
}

export default ReportForm;