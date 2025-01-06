import { z } from "zod";

export const dictumSchema = z.object({
    dictamen: z.string().min(1, "El dictamen es requerido"),
});
