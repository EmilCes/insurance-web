import { z } from 'zod';

const vehicleSchema = z.object({
    idBrand: z.coerce.
        number().positive(),
    idModel: z.coerce.
        number().positive(),
    serialNumber: z
        .string().min(1, "El número serial debe tener al menos 1 caracteres")
        .max(50, "El número serial no debe exceder los 50 caracteres"),
    idColor: z.coerce.
        number().positive(),
    plates: z
        .string().min(7, "Las placas debe tener al menos 7 caracteres")
        .max(15, "Las placas no debe exceder los 15 caracteres").regex(new RegExp("^(?=(?:.*[A-Z0-9]){7})(?=(?:.*-){2})[A-Z0-9-]{9}$"), "El formato de las placas no es válido"),
    idType: z.coerce.
        number().positive(),
    occupants: z.coerce.
        number().positive(),
    idService: z.coerce.
        number().positive()
});

export default vehicleSchema;
