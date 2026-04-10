import type { Post } from '../model/types'

interface PostCardProps {
  post: Post
}

// Server Component — no interactivity; safe to keep as RSC.
export function PostCard({ post }: PostCardProps) {
  return (
    <div className="rounded border border-gray-200 bg-white p-4 shadow-sm">
      <p className="font-medium text-gray-900">{post.body}</p>
      {/* TODO: render post fields */}
    </div>
  )
}
