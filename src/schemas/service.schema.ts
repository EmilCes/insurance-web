import { z } from 'zod';

const serviceSchema = z.object({
  name: z.string()
    .min(1, "El nombre es obligatorio")
    .max(15, "El nombre no debe exceder los 15 caracteres"),
  isCovered: z.boolean().optional(),
  coveredCost: z.coerce.number().min(0, "El costo asegurado debe ser 0 o mayor"),
});

export default serviceSchema;