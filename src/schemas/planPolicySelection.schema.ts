import { z } from 'zod';

const planPolicySelectionSchema = z.object({
    yearPolicy: z.coerce.
        number().positive(),
    idPolicyPlan: z.string().min(36, "Es necesario seleccionar un plan de póliza")
});

export default planPolicySelectionSchema;
