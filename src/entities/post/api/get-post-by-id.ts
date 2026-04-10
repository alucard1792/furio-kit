import { PostSchema } from '../model/types'

export async function getPostsById(id: number) {
    // 1. En vez de descargar los 100 posts, descargamos solo el que necesitamos pegando el ID en la URL
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }
    const rawData = await res.json()

    // 2. Parseamos como UN SOLO post usando PostSchema, en vez de la lista entera (PostListSchema)
    return PostSchema.parse(rawData)
}
