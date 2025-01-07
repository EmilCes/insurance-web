import { z } from 'zod';

const signUpPersonalDataSchema = z.object({
    firstName: z.string()
        .min(1, "El nombre es obligatorio")
        .max(50, "El nombre no debe exceder los 50 caracteres"),
    lastName: z.string()
        .min(1, "Los apellidos son obligatorios")
        .max(50, "Los apellidos no deben exceder los 100 caracteres"),
    birthDate: z.string()
        .min(1, "El año de nacimiento es obligatorio")
        .refine(val => !isNaN(Date.parse(val)), { message: "Fecha inválida" }),
    licenseNumber: z.string()
        .min(8, "El número de licencia debe tener al menos 8 caracteres")
        .max(10, "El número de licencia no debe tener mas de 10 caracteres"),
    rfc: z.string()
        .regex(/^([A-ZÑ&]{3,4})(\d{6})([A-Z\d]{2})([A\d])$/, "RFC inválido"),
    phoneNumber: z.string()
        .min(10, "El número de teléfono debe 10 dígitos")
        .max(10, "El número de teléfono debe 10 dígitos")
        .regex(/^\d+$/, "El teléfono solo debe contener números"),
    email: z.string()
        .email("Dirección de correo electrónico inválida"),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/, "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial."),
    confirmPassword: z.string()
        .min(8, "Debe confirmar la contraseña")
})
    .refine(data => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export default signUpPersonalDataSchema;
