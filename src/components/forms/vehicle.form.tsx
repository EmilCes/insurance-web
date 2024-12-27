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
import { BrandsVehicleResponse, ColorsVehicleResponse, getBrandsVehicles, getColorsVehicles, getServicesVehicles, getTypesVehicles, ModelVehicleResponse, ServicesVehicleResponse, TypeVehicleResponse, validatePlates } from "@/api/policyplan.api";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { FormPolicyProvider, useFormPolicyContext } from "@/lib/context/formPolicyContext";

const VehiculeForm = () => {
  const { formPolicyData, setFormPolicyData } = useFormPolicyContext();
  const router = useRouter();

  const [colors, setColors] = useState<ColorsVehicleResponse>([]);
  const [brands, setBrands] = useState<BrandsVehicleResponse>([]);
  const [models, setModels] = useState<ModelVehicleResponse>([]);
  const [types, setTypes] = useState<TypeVehicleResponse>([]);
  const [services, setServices] = useState<ServicesVehicleResponse>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      idBrand: formPolicyData.idBrand ? formPolicyData.idBrand : undefined,
      idModel: formPolicyData.idModel ? formPolicyData.idModel : undefined,
      serialNumber: formPolicyData.series ? formPolicyData.series : undefined,
      idColor: formPolicyData.idColor ? formPolicyData.idColor : undefined,
      plates: formPolicyData.plates ? formPolicyData.plates : "",
      idType: formPolicyData.idType ? formPolicyData.idType : undefined,
      occupants: formPolicyData.occupants ? formPolicyData.occupants : undefined,
      idService: formPolicyData.idService ? formPolicyData.idService : undefined
    }
  });

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const colorsData = await getColorsVehicles();
        if (colorsData) {
          setColors(colorsData);
        }

        const brandsData = await getBrandsVehicles();
        if (brandsData) {
          setBrands(brandsData);
        }

        const typesData = await getTypesVehicles();
        if (typesData) {
          setTypes(typesData);
        }

        const servicesData = await getServicesVehicles();
        if (servicesData) {
          setServices(servicesData);
        }

      } catch (error) {
        console.error("Error al obtener datos:", error);
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

  async function onSubmit(values: z.infer<typeof vehicleSchema>) {
    try {
      setIsLoading(true);
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
          form.setError("plates", {
            type: "manual",
            message: "Las placas ingresadas ya están registradas",
          });
        }
        setIsLoading(false);
      }

    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <div>

      <div>
        {isLoading && <Loading />}
      </div>

      <h2 className='text-2xl font-semibold'>Información del vehículo</h2>
      <h4 className="text-alternGray">Ingrese los datos de su vehículo</h4>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
            <h3 className='text-1xl font-semibold mt-4' id="prueba">Datos específicos de su vehículo</h3>
            <br className="hidden md:block" />

            <FormField
              control={form.control}
              name="idBrand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => { { field.onChange(value); onBrandValueChanged(value) } }}
                      defaultValue={formPolicyData?.idBrand ? formPolicyData.idBrand + "" : undefined}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem value={brand.idBrand + ""}>{brand.name}</SelectItem>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}
                      defaultValue={formPolicyData?.idModel ? formPolicyData.idModel + "" : undefined}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem value={model.idModel + ""}>{model.year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                    <Input placeholder="Serie del vehículo" {...field}
                      defaultValue={formPolicyData?.series ? formPolicyData.series + "" : undefined} />
                  </FormControl>
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
                      defaultValue={formPolicyData?.idColor ? formPolicyData.idColor + "" : undefined}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem value={color.idColor + ""}>{color.vehicleColor}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )} />


            <FormField
              control={form.control}
              name="plates"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Placas</FormLabel>
                  <FormControl>
                    <Input placeholder="Placas del vehículo" {...field}
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
              name="idType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}
                      defaultValue={formPolicyData?.idType ? formPolicyData.idType + "" : undefined}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {types.map((type) => (
                          <SelectItem value={type.idType + ""}>{type.vehicleType}</SelectItem>
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
                      defaultValue={formPolicyData?.idService ? formPolicyData.idService + "" : undefined}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona el servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem value={service.idService + ""}>{service.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )} />


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
  )
}

export default VehiculeForm