import { z } from 'zod';

const involvedPersonSchema = z.object({
  name: z.string().optional(),
  brand: z.string().optional(),
  color: z.string().optional(),
  plates: z.string().optional()
});

const reportSchema = z.object({
  vehicle: z.string().min(1, "Selecciona un vehículo"),

  images: z
    .array(z.string().url())
    .min(4, "Debes subir al menos 4 imágenes")
    .max(8, "Puedes subir hasta 8 imágenes como máximo"),

  ubication: z.object({
    latitud: z.number().min(-90).max(90, "Latitud inválida"),
    longitud: z.number().min(-180).max(180, "Longitud inválida"),
  }),

  personas: z
    .array(involvedPersonSchema)
    .min(1, "Debes agregar al menos una persona o seleccionar 'Anónimo'"),
});

export default reportSchema;