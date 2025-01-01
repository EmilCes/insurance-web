import { z } from 'zod';

const serviceSchema = z.object({
  name: z.string()
    .min(1, "El nombre es obligatorio")
    .max(15, "El nombre no debe exceder los 15 caracteres"),
  isCovered: z.boolean().optional(),
  coveredCost: z.coerce.number().positive("El costo asegurado debe ser positivo"),
});

export default serviceSchema;