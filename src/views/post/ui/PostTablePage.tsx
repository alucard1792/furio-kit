import { Suspense } from "react";
import { PostTable } from "@/widgets/post";
import { CreatePostForm } from "@/features/create-post";
import { getPostsById } from "@/entities/post";
import Link from "next/link";
import { EditPostForm } from "@/features/edit-post";

export async function PostTablePage({ searchParams }: { searchParams: Promise<{ editId: string }> }) {

    // Si no hay parámetros en la URL o si Next.js no los inyecta, usamos '?' para evitar que explote.
    const resolvedParams = await searchParams;
    const editId = resolvedParams?.editId;

    let postParaEditar = null

    if (editId) {
        postParaEditar = await getPostsById(Number(editId));
    }

    return (
        <>
            {postParaEditar && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
                        {/* Botón Mágico para CERRAR el Modal: 
                               Simplemente es un Link que resetea la URL borrando el editId */}
                        <Link href="?" className="absolute top-2 right-4 text-gray-500 hover:text-red-500 font-bold">X</Link>

                        <h2 className="text-xl font-bold mb-4">Editando: {postParaEditar.title}</h2>
                        {/* Inyectamos la Feature de editar */}
                        <EditPostForm defaultPost={postParaEditar} />
                    </div>
                </div>

            )}

            <div className="container mx-auto p-4 space-y-8">
                <h1 className="text-2xl font-bold">Administrador de Posts</h1>

                {/* Aquí metemos tu Formulario! */}
                <div className="max-w-md bg-white p-6 rounded-lg shadow-md border">
                    <h2 className="text-xl font-semibold mb-4">Crear Nuevo Post</h2>
                    <CreatePostForm />
                </div>

                <Suspense fallback={<div>Loading table...</div>}>
                    <PostTable />
                </Suspense>
            </div>
        </>
    )
}
