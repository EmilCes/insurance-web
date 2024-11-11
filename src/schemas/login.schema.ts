import { z } from 'zod';

const loginSchema = z.object({
    email: z.string()
        .email("Dirección de correo electrónico inválida")
        .min(1, "El correo electrónico es obligatorio"),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(100, "La contraseña no debe exceder los 100 caracteres")
});

export default loginSchema;
