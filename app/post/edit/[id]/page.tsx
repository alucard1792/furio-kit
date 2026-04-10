import { getPostsById } from "@/entities/post/api/get-post-by-id"
import { EditPostForm } from "@/features/edit-post";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    const post = await getPostsById(Number(resolvedParams.id));


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editando: {post.title}</h1>

            {/* 2. Le inyectamos los datos vivos al formulario */}
            <div className="max-w-md">
                <EditPostForm defaultPost={post} />
            </div>
        </div>



    )
}