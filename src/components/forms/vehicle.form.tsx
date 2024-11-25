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
import { validatePlates } from "@/api/policyplan.api";

const VehiculeForm = () => {

  const router = useRouter();

  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      brand: "",
      model: "",
      serialNumber: "",
      color: "",
      plates: "",
      type: "",
      service: ""
    }
  });

  async function onSubmit(values: z.infer<typeof vehicleSchema>) {
    try {
      console.log(values);
      //const response = await validatePlates(values);
      //router.push('/dashboard/policyPlan/selectionPlan');
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold'>Información del vehículo</h2>
      <h4 className="text-alternGray">Ingrese los datos de su vehículo</h4>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-12">
            <h3 className='text-1xl font-semibold mt-4' id="prueba">Datos específicos de su vehículo</h3>
            <br className="hidden md:block" />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una marca" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                        <SelectItem value="Toyota Motors">Toyota Motors</SelectItem>
                        <SelectItem value="Mercedes-Benz Group">Mercedes-Benz Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2019">2019</SelectItem>
                        <SelectItem value="2017">2017</SelectItem>
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
                    <Input placeholder="Serie del vehículo" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Rojo">Rojo</SelectItem>
                        <SelectItem value="Azul">Azul</SelectItem>
                        <SelectItem value="Amarillo">Amarillo</SelectItem>
                        <SelectItem value="Gris">Gris</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )} />


            <FormField
              control={form.control}
              name="plates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placas</FormLabel>
                  <FormControl>
                    <Input placeholder="Placas del vehículo" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automóvil importado">Automóvil importado</SelectItem>
                        <SelectItem value="Automóvil nacional">Automóvil nacional</SelectItem>
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
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona el número de ocupantes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 ocupante</SelectItem>
                        <SelectItem value="2">2 ocupantes</SelectItem>
                        <SelectItem value="3">3 ocupantes</SelectItem>
                        <SelectItem value="4">4 ocupantes</SelectItem>
                        <SelectItem value="5">5 ocupantes</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servicio</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona el servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Particular">Particular</SelectItem>
                        <SelectItem value="Público">Público</SelectItem>
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