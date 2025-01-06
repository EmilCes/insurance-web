import { z } from 'zod';

const involvedPersonSchema = z.object({
  name: z.string().optional(),
  brandId: z.string().optional(),
  colorId: z.string().optional(),
  plates: z.string().optional()
});

const reportSchema = z.object({
  vehicle: z.string().min(1, "Selecciona un vehículo"),

  images: z
    .array(z.instanceof(File))
    .min(4, "Debes subir al menos 4 imágenes")
    .max(8, "Puedes subir hasta 8 imágenes como máximo"),

  location: z.object({
    latitude: z.number().min(-90).max(90, "Latitud inválida").refine((val) => val !== 0, {
      message: "la latitud es requerida"
    }),
    longitude: z.number().min(-180).max(180, "Longitud inválida").refine((val) => val !== 0, {
      message: "La longitud es requerida"
    }),
  }),

  involvedPeople: z
    .array(involvedPersonSchema)
    .min(1, "Debes agregar al menos una persona o seleccionar 'Anónimo'"),
});

export default reportSchema;