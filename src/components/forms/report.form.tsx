"use client"

import reportSchema from "@/schemas/report.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useState } from "react";

/*
const MapComponent = ({ onLocationSelected }: { onLocationSelected: (location: { latitude: number, longitude: number }) => void }) => {
    const [viewport, setViewport] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 12,
    });

    const [showModal, setShowModal] = useState(false);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    const handleGeolocate = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    setViewport({ latitude, longitude, zoom: 14 });
                    setShowModal(true); // Open modal to allow user to modify location
                },
                (error) => {
                    console.error('Error getting location', error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleAcceptLocation = () => {
        if (userLocation) {
            onLocationSelected(userLocation);
        }
        setShowModal(false); // Close modal
    };

    return (
        <>
            <Button variant="outline" onClick={handleGeolocate}>
                Obtener Ubicación
            </Button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="w-full h-96">
                        <ReactMapGL
                            {...viewport}
                            width="100%"
                            height="100%"
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                            onViewportChange={(nextViewport) => setViewport(nextViewport)}
                            mapboxApiAccessToken={process.env.MAPBOX_API_KEY}
                        >
                            {userLocation && (
                                <Marker latitude={userLocation.latitude} longitude={userLocation.longitude}>
                                    <div className="bg-red-500 p-2 rounded-full" />
                                </Marker>
                            )}
                            <GeolocateControl />
                        </ReactMapGL>

                        <div className="mt-4">
                            <Button onClick={handleAcceptLocation}>Aceptar Ubicación</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};*/

const ReportForm = () => {

    const form = useForm<z.infer<typeof reportSchema>>({
        resolver: zodResolver(reportSchema)
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "personas"
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
                                            <Button
                                                variant="outline"
                                                onClick={() => append({ name: "", brand: "", color: "", plates: "" })}
                                            >
                                                Subir Imagen
                                            </Button>
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
                                            <Button
                                                variant="outline"
                                                onClick={() => append({ name: "", brand: "", color: "", plates: "" })}
                                            >
                                                Obtener Ubicación
                                            </Button>
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
                                        name={`personas.${index}.name`}
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
                                        name={`personas.${index}.brand`}
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
                                        name={`personas.${index}.color`}
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
                                        name={`personas.${index}.plates`}
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