import { PostTablePage } from "@/views/post";

export default async function Page({ searchParams }: { searchParams: promise<{ editId: string }> }) {
    return <PostTablePage searchParams={searchParams} />
}