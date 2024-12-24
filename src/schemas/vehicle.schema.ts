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
        .max(50, "Las placas no debe exceder los 50 caracteres"),
    idType: z.coerce.
        number().positive(),
    occupants: z.coerce.
        number().positive(),
    idService: z.coerce.
        number().positive()
});

export default vehicleSchema;
