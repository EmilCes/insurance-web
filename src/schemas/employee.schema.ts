import { z } from "zod";

const employeeSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  dateOfBirth: z.string().min(1, "La fecha de nacimiento es requerida"),
  postalCode: z.string().min(5, "El código postal debe tener al menos 5 caracteres"),
  address: z.string().min(1, "La dirección es requerida"),
  idMunicipality: z.coerce.number().min(1, "El municipio es requerido"),
  idEmployeeType: z.coerce.number().min(1, "El tipo de empleado es requerido"),
  email: z.string().email("El correo electrónico no es válido"),
  employeeNumber: z.string().min(1, "El número de empleado es requerido"),
});

export default employeeSchema;
