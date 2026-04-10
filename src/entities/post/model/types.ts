import { z } from 'zod'

//para los schemas zod por conveniencia se usa xxxxSchema
export const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
})
export const PostListSchema = z.array(PostSchema)

//para los tipos de inferencia se usa el nombre del modelo sin ningun sufijo
export type Post = z.infer<typeof PostSchema>
export type PostList = z.infer<typeof PostListSchema>