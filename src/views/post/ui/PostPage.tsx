import { Suspense } from "react";

import { Post } from "@/widgets/post"

export function PostPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Post />
        </Suspense>
    )
}