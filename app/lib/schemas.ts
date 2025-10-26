import { z } from "zod";


// Alineado con CreateChefDto de Nest (ambos strings)
export const createChefSchema = z.object({
name: z.string().min(1, "El nombre es obligatorio").max(100),
skill: z.string().min(1, "La habilidad es obligatoria").max(100),
});


export type CreateChefSchema = z.infer<typeof createChefSchema>;