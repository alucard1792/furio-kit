import { PostListSchema } from '../model/types'

export async function getAllPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await res.json()
  return PostListSchema.parse(data)
}
