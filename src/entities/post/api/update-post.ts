import { type Post, PostSchema } from "../model/types";

export async function updatePost(post: Post) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post)
    })
    if (!res.ok)
        throw new Error("failed to update a post");
    const response = await res.json();
    return PostSchema.parse(response);
}