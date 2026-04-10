import { PostCard, getAllPosts } from "@/entities/post";
//import { getAllPosts } from "@/entities/post/api/get-posts"; -> esto esta mal, rompe el contrato, esto se le llama barrel export ya que esto actua como una interfaz y cualquier cosa que no se declare aca actua como si tubiera el modificador internal

// Server Component — widgets are RSC by default.
// Mark "use client" only if this widget needs hooks or browser APIs.
export async function Post() {
  const data = await getAllPosts();
  return (

    <section className="px-6 py-4">
      {/* TODO: implement Post widget */}
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </section>
  )
}
