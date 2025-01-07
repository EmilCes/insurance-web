import { z } from 'zod';

const signUpBillinglDataSchema = z.object({
    postalCode: z.string()
        .length(5, "El código postal debe tener exactamente 5 caracteres")
        .regex(/^\d+$/, "El código postal solo debe contener números"),
    state: z.string()
        .min(1, "Debe seleccionar un estado"),
    municipality: z.string()
        .min(1, "La colonia es obligatoria"),
    address: z.string()
        .min(1, "La dirección es obligatoria")
        .max(30, "La direccion no puede ser mayor a 30 caracteres"),
    bankAccountNumber: z.string()
        .min(8, "El número debe tener minimo 8 dígitos")
        .max(10, "El número no debe exceder los 15 dígitos"),
    expirationDateBankAccount: z.string()
        .min(1, "Debe ingresar la fecha de expiración"),
})

export default signUpBillinglDataSchema;
