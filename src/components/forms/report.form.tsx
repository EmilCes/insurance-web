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
    const [showCustomMessage, setShowCustomMessage] = useState<{ show: boolean, title: string, message: string }>({ show: false, title: "", message: "" });
    const router = useRouter();

    const [showMap, setShowMap] = useState(mode === 'view');
    const [activePolicies, setActivePolicies] = useState<ActivePolicyResponse[]>([]);
    const [colors, setColors] = useState<ColorsVehicleResponse>([]);
    const [brands, setBrands] = useState<BrandsVehicleResponse>([]);

    const isReadOnly = mode === 'view';
    const imageUrls = defaultValues?.photographs.map(photo => photo.url) || [];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (!isReadOnly) {
                    await fetchActivePolicies();
                    await fetchColors();
                    await fetchBrands();
                }
            } catch (error) {
                setShowMessageError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const fetchActivePolicies = async () => {
        const activePolicies = await getAllActivePolicies();

        if (activePolicies?.length === 0) {
            setShowCustomMessage({
                show: true,
                title: "¡Sin polizas!",
                message: "No tienes polizas, compra una antes de crear un reporte."
            });
            return;
        }

        if (activePolicies) {
            setActivePolicies(activePolicies);
        } else {
            throw new Error("Error al recuperar las pólizas vigentes");
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
            {showCustomMessage.show && <ErrorMessage customTitle={showCustomMessage.title} customMessage={showCustomMessage.message} />}

            <div className="mb-6">
                <h2 className="font-semibold text-xl md:text-2xl">Información del reporte</h2>
                <h3 className="text-sm md:text-base text-alternGray">Información del reporte generado.</h3>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {(role === "Ajustador" && mode === "view") && (
                        <>
                            <div className="flex flex-col mt-4 mb-4">
                                <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 mt-4">
                                    <div className="md:w-1/3 space-y-4">
                                        <div>
                                            <h3 className="text-sm text-alternGray">Fecha del reporte</h3>
                                            <p>{defaultValues?.date}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-alternGray">Nombre del conductor</h3>
                                            <p>{defaultValues?.driver.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-alternGray">Email del conductor</h3>
                                            <p>{defaultValues?.driver.email}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-alternGray">Teléfono del conductor</h3>
                                            <p>{defaultValues?.driver.phone}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-alternGray">Número de licencia</h3>
                                            <p>{defaultValues?.driver.licenseNumber}</p>
                                        </div>
                                    </div>

                                    <div className="md:w-1/3 space-y-4">
                                        <div>
                                            <h3 className="text-sm text-alternGray">Placas</h3>
                                            <p>{defaultValues?.vehicle.plates}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-alternGray">Marca del vehículo</h3>
                                            <p>{defaultValues?.vehicle.brand}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-alternGray">Color del vehículo</h3>
                                            <p>{defaultValues?.vehicle.color}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-alternGray">Número de serie</h3>
                                            <p>{defaultValues?.vehicle.serialNumberVehicle}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-alternGray">Plan de póliza</h3>
                                            <p>{defaultValues?.policy.policyPlan.title}</p>
                                        </div>
                                    </div>

                                    <div className="md:w-1/3 space-y-4">
                                        <div>
                                            <h3 className="text-sm text-alternGray">Número de póliza</h3>
                                            <p>{defaultValues?.policy.serialNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                        </>
                    )}

                    <div className="flex flex-col md:flex-row md:space-x-8 my-6 items-stretch mb-8">
                        <div className="md:w-1/2 space-y-4 flex flex-col justify-between">
                            <FormField
                                control={form.control}
                                name="vehicle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Poliza</FormLabel>
                                        <FormControl>
                                            {isReadOnly ? (
                                                <div className="py-2">
                                                    {defaultValues
                                                        ? `${defaultValues.vehicle.brand} - ${defaultValues.vehicle.color} - ${defaultValues.vehicle.modelYear}`
                                                        : ''}
                                                </div>
                                            ) : (
                                                <Select
                                                    disabled={isReadOnly}
                                                    onValueChange={(value) => { field.onChange(value); }}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecciona una póliza" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {activePolicies.map((policy, id) => (
                                                            <SelectItem value={policy.serialNumber} key={id}>
                                                                {`${policy.Vehicle.Model.Brand.name} - ${policy.Vehicle.Color.vehicleColor} - ${policy.Vehicle.Model.year}`}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imágenes del siniestro</FormLabel>
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

                        <div className="md:w-1/2 flex flex-col flex-grow min-h-0">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Ubicación</FormLabel>
                                        <FormControl className="flex-1">
                                            <div className="p-4 border-lightGray border-[1px] rounded-md flex justify-center items-center h-52 md:h-[90%] sm:w-full relative">
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
                            <h2 className="font-semibold text-xl md:text-2xl">Datos de conductores involucrados</h2>
                            <h3 className="text-sm md:text-base text-alternGray">
                                {isReadOnly ?
                                    "Datos de conductores involucrados registrados."
                                    : "Ingrese los datos de los conductores involucrados para agilizar el proceso. Incluye toda la información que tengas."}
                            </h3>
                        </div>

                        {isReadOnly ? (
                            defaultValues?.implicateParties.map((party, index) => (
                                <div key={index} className="p-4 mt-4 border-lightGray border-[1px] rounded-lg">
                                    <h2 className="text-xl">Conductor #{index + 1}</h2>
                                    <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-2">
                                        <div className="md:w-1/2 space-y-4">
                                            <FormItem>
                                                <FormLabel>Nombre del conductor</FormLabel>
                                                <FormControl>
                                                    <p className="py-2">{party.name}</p>
                                                </FormControl>
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Marca</FormLabel>
                                                <FormControl>
                                                    <p className="py-2">{party.brand}</p>
                                                </FormControl>
                                            </FormItem>
                                        </div>

                                        <div className="md:w-1/2 space-y-4">
                                            <FormItem>
                                                <FormLabel>Color</FormLabel>
                                                <FormControl>
                                                    <p className="py-2">{party.color}</p>
                                                </FormControl>
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Placas</FormLabel>
                                                <FormControl>
                                                    <p className="py-2">{party.plates}</p>
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
                                        {index !== 0 && (
                                            <Button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="absolute top-2 right-2 text-red-500 bg-transparent hover:bg-red-500 hover:text-white"
                                            >
                                                X
                                            </Button>
                                        )}
                                        <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-2">
                                            <div className="md:w-1/2 space-y-4">
                                                {/* Campo de Nombre */}
                                                <FormField
                                                    control={form.control}
                                                    name={`involvedPeople.${index}.name`}
                                                    render={({ field: inputField }) => (
                                                        <FormItem>
                                                            <FormLabel>Nombre del conductor (&quot;Anónimo&quot; si se desconoce)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="w-full"
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
                                                                            <SelectItem value={brand.idBrand + ""} key={brand.idBrand}>
                                                                                {brand.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="md:w-1/2 space-y-4">
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
                                                                            <SelectItem key={color.idColor} value={color.idColor + ""}>
                                                                                {color.vehicleColor}
                                                                            </SelectItem>
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
                                                            <FormLabel>Placas (&quot;XXXXXXX&quot; si se desconoce)</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    className="w-full"
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

                                {fields.length < 4 && (
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
                                )}
                            </>
                        )}
                    </div>

                    {mode === 'create' && (
                        <div className="mt-8 flex justify-end">
                            <Button className="bg-darkBlue ml-auto w-full md:w-1/4">Crear Reporte</Button>
                        </div>
                    )}
                </form>
            </Form>
        </>
    )
}

export default ReportForm;