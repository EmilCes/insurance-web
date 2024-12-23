import { z } from 'zod';

const planPolicySchema = z.object({
    yearPolicy: z.coerce.
        number().positive(),
    idPolicyPlan: z.string()
});

export default planPolicySchema;
