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
import { useEffect, useState } from "react";
import { useFormPolicyContext } from "@/lib/context/formPolicyContext";
import ProgressInPolicyForm from "@/app/(main)/dashboard/policyPlan/progresspolicyform";
import { useStatusPageContext } from "@/lib/statusPage/statusContext";
import { ColorsVehicleResponse, getColorsVehicles, getCurrentAllVehicles, getServicesVehicles, getTypesVehicles, ServicesVehicleResponse, TypeVehicleResponse, validatePlates, VehiclesCurrentAllResponse } from "@/api/vehicle.api";
import { BrandsVehicleResponse, getBrandsVehicles, ModelVehicleResponse } from "@/api/brand.api";

const VehiculeForm = () => {
  const { formPolicyData, setFormPolicyData, isPreviousSelected, setIsPreviousSelected } = useFormPolicyContext();
  const { setIsLoading, showMessageError, setShowMessageError } = useStatusPageContext();
  const router = useRouter();

  const [colors, setColors] = useState<ColorsVehicleResponse>([]);
  const [brands, setBrands] = useState<BrandsVehicleResponse>([]);
  const [models, setModels] = useState<ModelVehicleResponse>([]);
  const [types, setTypes] = useState<TypeVehicleResponse>([]);
  const [services, setServices] = useState<ServicesVehicleResponse>([]);
  const [currentVehicles, setCurrentVehicles] = useState<VehiclesCurrentAllResponse>([]);

  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      idBrand: formPolicyData.idBrand ? formPolicyData.idBrand : undefined,
      idModel: formPolicyData.idModel ? formPolicyData.idModel : 0,
      serialNumber: formPolicyData.series ? formPolicyData.series : "",
      idColor: formPolicyData.idColor ? formPolicyData.idColor : undefined,
      plates: formPolicyData.plates ? formPolicyData.plates : "",
      idType: formPolicyData.idType ? formPolicyData.idType : undefined,
      occupants: formPolicyData.occupants ? formPolicyData.occupants : 0,
      idService: formPolicyData.idService ? formPolicyData.idService : undefined
    }
  });

  useEffect(() => {
    setIsLoading(true);
    const fetchColors = async () => {
      try {
        const colorsData = await getColorsVehicles();
        if (colorsData != null && colorsData.length > 0) {
          setColors(colorsData);
        } else {
          throw new Error("Error al recuperar los colores");
        }

        const brandsData = await getBrandsVehicles();
        if (brandsData != null && brandsData.length > 0) {
          setBrands(brandsData);
        } else {
          throw new Error("Error al recuperar las marcas");
        }

        const typesData = await getTypesVehicles();
        if (typesData != null && typesData.length > 0) {
          setTypes(typesData);
        } else {
          throw new Error("Error al recuperar los tipos");
        }

        const servicesData = await getServicesVehicles();
        if (servicesData != null && servicesData.length > 0) {
          setServices(servicesData);
        } else {
          throw new Error("Error al recuperar los servicios");
        }

        const vehicleCurrentData = await getCurrentAllVehicles();
        if (vehicleCurrentData != null && vehicleCurrentData.length > 0) {
          setCurrentVehicles(vehicleCurrentData);
        }

        if (showMessageError) {
          setShowMessageError(false);
        }
      } catch (error) {
        setShowMessageError(true);
      }
      setIsLoading(false);
    };
    fetchColors();
  }, []);

  useEffect(() => {
    const showPreviousData = () => {
      if (formPolicyData?.idBrand) {
        onBrandValueChanged(formPolicyData?.idBrand + "");
      }
    };
    showPreviousData();
  }, [brands]);

  const onBrandValueChanged = (value: string) => {
    setIsLoading(true);
    if (isNaN(+value)) return;

    brands.forEach(brand => {
      if (brand.idBrand == +value) {
        setModels(brand.Model);
      }
    });
    setIsLoading(false);
  }

  const checkModelSameBrand = (idModel: number, idBrand: number) => {
    let modelValid = false;
    brands.forEach(brand => {
      if (brand.idBrand == idBrand) {
        brand.Model.forEach(model => {
          if (model.idModel == idModel) {
            modelValid = true;
          }
        })
      }
    })
    return modelValid;
  }

  const changeCurrentVehicleData = (plates: string) => {
    if (plates == "1") {
      setIsPreviousSelected(false);
      form.reset({
        plates: "",
        idBrand: 0,
        idModel: 0,
        serialNumber: "",
        idColor: 0,
        idType: 0,
        idService: 0,
        occupants: 0,
      });
    }
    if (plates != undefined && plates.length > 0) {
      const vehicle = currentVehicles.find((vehicle) => vehicle.plates === plates);
      if (vehicle) {
        setIsPreviousSelected(true);
        form.reset({
          plates: vehicle.plates,
          idBrand: vehicle.idBrand,
          idModel: vehicle.idModel,
          serialNumber: vehicle.serialNumber,
          idColor: vehicle.idColor,
          idType: vehicle.idType,
          idService: vehicle.idService,
          occupants: vehicle.occupants,
        });
      }
    }
  }

  async function onSubmit(values: z.infer<typeof vehicleSchema>) {
    try {
      setIsLoading(true);
      const modelValid = checkModelSameBrand(values.idModel, values.idBrand)
      if (!modelValid) {
        form.setError("idModel", {
          type: "manual",
          message: "Seleccione un modelo válido",
        });
        setIsLoading(false);
        return;
      }

      const response = await validatePlates(values);
      if (response.isValid) {
        setFormPolicyData({
          idBrand: values.idBrand,
          idModel: values.idModel,
          series: values.serialNumber,
          idColor: values.idColor,
          plates: values.plates,
          idType: values.idType,
          occupants: values.occupants,
          idService: values.idService
        });

        router.push('/dashboard/policyPlan/selectionPlan');

      } else {
        if (response.status == 409) {
          const vehicle = currentVehicles.find((vehicle) => vehicle.plates === values.plates);
          if (vehicle == null) {
            form.setError("plates", {
              type: "manual",
              message: "No puede registrar estas placas",
            });
          }else{
            form.setError("plates", {
              type: "manual",
              message: "Las placas ingresadas ya están registradas y tienen una póliza vigente. Puede comprar otra póliza para este vehículo un mes antes de que se venza",
            });
          }

        }
        setIsLoading(false);
      }

    } catch (err) {
      setIsLoading(false);
      setShowMessageError(true);
    }
  }

  return (
    <div>

      <ProgressInPolicyForm currentStep={1}></ProgressInPolicyForm>

      <div className="mx-auto w-full max-w-screen-lg px-8 pb-8 pt-4">

        <h2 className='text-2xl font-semibold '>Información del vehículo</h2>
        <h4 className="text-alternGray">Ingrese los datos de su vehículo</h4>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <h3 className='text-1xl font-semibold mt-4 mb-1'>Datos específicos de su vehículo</h3>

            <p className="text-alternGray text-sm mb-2">Si ha registrado a su vehículo previamente seleccionelo:</p>
            <Select onValueChange={(value) => { changeCurrentVehicleData(value) }}
              defaultValue={isPreviousSelected ? (formPolicyData?.plates ? formPolicyData.plates : "1") : "1"}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un vehículo previo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={1} value={"1"}>{"Sin vehículo previo"}</SelectItem>
                {currentVehicles?.map((vehicle) => (
                  <SelectItem key={vehicle.plates} value={vehicle.plates}>{"Placas: " + vehicle.plates +
                    "; Marca: " + vehicle.brandName + "; Modelo: " + vehicle.modelName + "; Color: " + vehicle.colorName +
                    "; Tipo: " + vehicle.typeName + "; Ocupantes: " + vehicle.occupants + "; Servicio: " + vehicle.serviceName}</SelectItem>
                ))}
              </SelectContent>
            </Select>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12 mt-4">

              <FormField
                control={form.control}
                name="plates"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Placas</FormLabel>
                    <FormControl>
                      <Input placeholder="Placas del vehículo" {...field} disabled={isPreviousSelected}
                        defaultValue={formPolicyData?.plates ? formPolicyData.plates + "" : undefined} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-2">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serie</FormLabel>
                    <FormControl>
                      <Input placeholder="Serie del vehículo" {...field} disabled={isPreviousSelected}
                        defaultValue={formPolicyData?.series ? formPolicyData.series + "" : undefined} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {isPreviousSelected ? <></> :
                <>
                  <FormField
                    control={form.control}
                    name="idBrand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marca</FormLabel>
                        <FormControl>
                          <Select onValueChange={(value) => { { field.onChange(value); onBrandValueChanged(value) } }}
                            value={formPolicyData?.idBrand ? formPolicyData.idBrand + "" : undefined} >
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

                  <FormField
                    control={form.control}
                    name="idModel"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Modelo</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}
                            value={formPolicyData?.idModel ? formPolicyData.idModel + "" : undefined}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              {models.map((model) => (
                                <SelectItem key={model.idModel} value={model.idModel + ""}>{model.year}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        {fieldState.error && (
                          <p className="text-red-500 text-sm mt-2">
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}
                            value={formPolicyData?.idColor ? formPolicyData.idColor + "" : undefined}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem key={color.idColor} value={color.idColor + ""}>{color.vehicleColor}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )} />

                  <FormField
                    control={form.control}
                    name="idType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}
                            value={formPolicyData?.idType ? formPolicyData.idType + "" : undefined}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              {types.map((type) => (
                                <SelectItem key={type.idType} value={type.idType + ""}>{type.vehicleType}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )} />


                  <h3 className='text-1xl font-semibold mt-1'>Datos generales</h3>
                  <br className="hidden md:block" />


                  <FormField
                    control={form.control}
                    name="occupants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ocupantes</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="10" placeholder="Número de ocupantes" {...field}
                            defaultValue={formPolicyData?.occupants ? formPolicyData.occupants + "" : undefined} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idService"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servicio</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}
                            value={formPolicyData?.idService ? formPolicyData.idService + "" : undefined}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecciona el servicio" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service.idService} value={service.idService + ""}>{service.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )} />
                </>}

              <br className="hidden md:block" />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="w-4/5 text-center flex justify-center mt-4 min-h-12 bg-darkBlue">
                  Continuar
                </Button>
              </div>

            </div>

          </form>
        </Form>
      </div>
    </div>
  )
}

export default VehiculeForm