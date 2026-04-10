'use client'

import { useActionState } from 'react'
import { Button } from '@/shared/ui'
import { editPostAction } from '../actions/edit-post-action'
import type { Post } from '@/entities/post'

export function EditPostForm({ defaultPost }: { defaultPost: Post }) {
  const [state, action, isPending] = useActionState(editPostAction, {})


  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="userId" className="text-sm font-medium text-gray-700">User ID</label>
        <input id="userId" name="userId" type="number" defaultValue={state.data?.userId ?? defaultPost.userId} className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ingresa el UserID" />
        {state.fieldErrors?.userId?.map((err, i) => (
          <p key={i} className="text-xs text-red-500">{err}</p>
        ))}
      </div>


      <div className="flex flex-col gap-1">
        <label htmlFor="id" className="text-sm font-medium text-gray-700">Post ID</label>
        <input id="id" name="id" type="number" defaultValue={state.data?.id ?? defaultPost.id} className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ingresa el PostID" />
        {state.fieldErrors?.id?.map((err, i) => (
          <p key={i} className="text-xs text-red-500">{err}</p>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">Título</label>
        <input id="title" name="title" type="text" defaultValue={state.data?.title ?? defaultPost.title} className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ingresa el titulo" />
        {state.fieldErrors?.title?.map((err, i) => (
          <p key={i} className="text-xs text-red-500">{err}</p>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="body" className="text-sm font-medium text-gray-700">Contenido</label>
        <textarea id="body" name="body" rows={4} defaultValue={state.data?.body ?? defaultPost.body} className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="ingresa el contenido" />
        {state.fieldErrors?.body?.map((err, i) => (
          <p key={i} className="text-xs text-red-500">{err}</p>
        ))}
      </div>





      <Button type="submit" disabled={isPending}>
        {isPending ? 'Submitting…' : 'Submit'}
      </Button>
    </form>
  )
}
