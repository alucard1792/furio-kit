import { type Post, PostSchema } from "../model/types";

export async function createPost(post: Post) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Failed to create post");
  const data = await res.json();
  return PostSchema.parse(data);//se valida la respuesta de la peticion, en este caso la api retorna el objeto creado con un id asignado
}
