import { z } from 'zod';

const vehicleSchema = z.object({
    brand: z
        .string().min(1, "La marca debe tener al menos 1 caracter")
        .max(50, "La marca no debe exceder los 50 caracteres"),
    model: z
        .string().min(4, "El modelo debe tener al menos 1 caracteres")
        .max(5, "El modelo no debe exceder los 100 caracteres"),
    serialNumber: z
        .string().min(1, "El número serial debe tener al menos 1 caracteres")
        .max(50, "El número serial no debe exceder los 50 caracteres"),
    color: z
        .string().min(1, "El color debe tener al menos 1 caracteres")
        .max(40, "El color no debe exceder los 40 caracteres"),
    plates: z
        .string().min(5, "Las placas debe tener al menos 5 caracteres")
        .max(50, "Las placas no debe exceder los 50 caracteres"),
    type: z
        .string().min(5, "El tipo debe tener al menos 5 caracteres")
        .max(50, "El tipo no debe exceder los 50 caracteres"),
    occupants: z.coerce.
        number().positive(),
    service: z
        .string().min(5, "El servicio debe tener al menos 5 caracteres")
        .max(50, "El tipo no debe exceder los 50 caracteres")
});

export default vehicleSchema;
