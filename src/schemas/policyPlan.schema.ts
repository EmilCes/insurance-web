import { z } from 'zod';
import serviceSchema from './service.schema';

const policyPlanSchema = z.object({
    title: z.string()
        .min(1, "El título es obligatorio")
        .max(30, "El título no debe exceder los 30 caracteres"),

    description: z.string()
        .min(1, "La descripción es obligatoria")
        .max(255, "La descripción no debe exceder los 255 caracteres"),

    maxPeriod: z.coerce.number().positive("El periodo debe ser positivo"),

    basePrice: z.coerce.number().positive("El precio debe ser positivo"),

    service: z.array(serviceSchema)
        .min(1, "Debe haber al menos un servicio"),
});

export default policyPlanSchema