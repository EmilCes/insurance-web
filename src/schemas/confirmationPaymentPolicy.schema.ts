import { z } from 'zod';

const confirmationPolicySchema = z.object({
    phoneNumber: z.string()
        .min(10, "Ingrese un número de teléfono válido de al menos 10 dígitos")
        .regex(/^\d+$/, "El número de teléfono solo debe contener dígitos."),
    monthsOfPayments: z.coerce.
        number().positive("Seleccione un método de pago válido")
});

export default confirmationPolicySchema;
