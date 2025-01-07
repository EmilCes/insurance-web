import { z } from 'zod';

const userDataSchema = z.object({
    firstName: z.string().min(1, "El nombre es obligatorio"),
    lastName: z.string().min(1, "El apellido es obligatorio"),
    birthDate: z.string().min(1, "La fecha de nacimiento es obligatoria"),
    licenseNumber: z.string().min(1, "El número de licencia es obligatorio"),
    rfc: z.string().min(1, "El RFC es obligatorio"),
    email: z.string().email("El correo electrónico debe ser válido"),
    phoneNumber: z.string().min(1, "El número de teléfono es obligatorio"),
    address: z.string().min(1, "La dirección es obligatoria"),
    postalCode: z.string().min(1, "El código postal es obligatorio"),
    bankAccountNumber: z.string().min(1, "El número de cuenta bancaria es obligatorio"),
    expirationDateBankAccount: z.string().min(1, "La fecha de vencimiento de la cuenta bancaria es obligatoria"),
    state: z.string().min(1, "El estado es obligatorio"),
    municipality: z.string().min(1, "El municipio es obligatorio"),
});

export default userDataSchema;
