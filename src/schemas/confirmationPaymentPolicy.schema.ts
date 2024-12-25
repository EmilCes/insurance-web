import { z } from 'zod';

const confirmationPolicySchema = z.object({
    monthsOfPayments: z.coerce.
        number().positive("Seleccione un método de pago válido")
});

export default confirmationPolicySchema;
