import { z } from 'zod';

const momentoSchema = z.object({
    
    titulo : z.string(),
    ubicacion: z.string(),
    foto: z.string(),
    impresiones : z.string()
})

export function validateMomento(obj){
    return momentoSchema.safeParse(obj)
}

export function validateParcial(obj){
    return momentoSchema.partial().safeParse(obj)
}