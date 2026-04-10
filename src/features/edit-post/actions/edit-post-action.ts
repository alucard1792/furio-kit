'use server'

import { z } from 'zod'
import { updatePost } from '@/entities/post/api/update-post'
import type { Post } from '@/entities/post'
import { redirect } from 'next/navigation'

const EditPostSchema = z.object({
  // coerce.number convierte a 0 si el input está vacío.
  // .int() asegura que no haya decimales, y .positive() obliga a que sea 1 o mayor, evitando ceros o vacíos.
  userId: z.coerce.number()
    .int("Debe ser un número entero")
    .positive("Este campo es obligatorio y debe ser mayor a 0"),

  id: z.coerce.number()
    .int("Debe ser un número entero")
    .positive("Este campo es obligatorio y debe ser mayor a 0"),

  // .trim() corta los espacios vacíos ("    " pasa a ser "").
  // Luego aplicamos el min y max, ahorrándonos problemas de gente tratando de subir solo espacios en blanco.
  title: z.string()
    .trim()
    .min(5, "El título es muy corto. Mínimo 5 letras.")
    .max(100, "El título es demasiado largo. Máximo 100 letras."),

  body: z.string()
    .trim()
    .min(10, "Tu post debe ser más descriptivo. Mínimo 10 letras.")
    .max(5000, "El post excede el límite de 5000 caracteres.")
})

export interface EditPostActionState {
  error?: string
  success?: boolean
  fieldErrors?: {
    userId?: string[]
    id?: string[]
    title?: string[]
    body?: string[]
  }
  data?: {
    userId?: string
    id?: string
    title?: string
    body?: string
  }
  editedPost?: Post
}

export async function editPostAction(
  _prevState: EditPostActionState,
  formData: FormData,
): Promise<EditPostActionState> {
  const result = EditPostSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {}

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string
      if (!fieldErrors[field]) fieldErrors[field] = []
      fieldErrors[field].push(issue.message)
    })

    return {
      error: 'Por favor, corrige los errores debajo de cada campo',
      fieldErrors,
      data: {
        userId: formData.get('userId')?.toString() || '',
        id: formData.get('id')?.toString() || '',
        title: formData.get('title')?.toString() || '',
        body: formData.get('body')?.toString() || ''
      }
    }
  }

  try {
    // Simular un retraso en la red de 3 segundos para poder ver el efecto visual del botón cargando
    await new Promise(resolve => setTimeout(resolve, 3000))
    // Guardamos la respuesta real de la API externa (El post con su ID simulado generado por JSONPlaceholder)
    const newPost = await updatePost(result.data as Post);
  } catch (e) {
    // El frontend tomará este texto y lo pintará en rojo automáticamente en la variable state.error
    return { error: "Ocurrió un error inesperado al conectar con el servidor." }
  }
  // Next.js usa "Errores silenciosos" para navegar. Si lo ponemos adentro del Try, el Catch lo atraparía por accidente.
  redirect('/post/table');
}
