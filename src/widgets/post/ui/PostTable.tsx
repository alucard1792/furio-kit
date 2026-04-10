import { getAllPosts, PostRow } from "@/entities/post";

export async function PostTable() {
    const data = await getAllPosts();
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mx-auto max-w-7xl">
            <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-medium">ID</th>
                        <th scope="col" className="px-6 py-4 font-medium">Body</th>
                        <th scope="col" className="px-6 py-4 font-medium">Title</th>
                        <th scope="col" className="px-6 py-4 font-medium">User ID</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((post) => (
                        <PostRow key={post.id} post={post} />
                    ))}
                </tbody>
            </table>
        </div>

    );
}
