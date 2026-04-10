import type { Post } from "../model/types";
import Link, { LinkProps } from "next/link";

interface PostRowProps {
    post: Post;
}

export function PostRow({ post }: PostRowProps) {
    return (
        <tr className="hover:bg-gray-100 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 border-b border-gray-100">{post.id}</td>
            <td className="px-6 py-4 text-gray-700 border-b border-gray-100 max-w-sm truncate">{post.body}</td>
            <td className="px-6 py-4 text-gray-700 border-b border-gray-100 max-w-sm truncate font-semibold">{post.title}</td>
            <td className="px-6 py-4 text-gray-500 border-b border-gray-100 whitespace-nowrap">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    User {post.userId}
                </span>
            </td>
            <td>
                <Link href={`/post/edit/${post.id}`} className="btn">editar (vista)</Link>
                <Link href={`?editId=${post.id}`} className="btn">editar (modal)</Link>
            </td>
        </tr>
    )
}