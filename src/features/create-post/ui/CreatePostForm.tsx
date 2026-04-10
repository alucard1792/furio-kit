'use client'

import { useActionState } from 'react'
import { Button } from '@/shared/ui'
import { createPostAction } from '../actions/create-post-action'

export function CreatePostForm() {
  const [state, action, isPending] = useActionState(createPostAction, {})

  return (
    <form action={action} className="space-y-4">
      {/* Mensaje de Éxito! */}
      {state.success && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200">
          <p className="text-sm font-medium text-green-800">
            ¡Post creado satisfactoriamente en el servidor!
          </p>
          {state.createdPost && (
            <div className="mt-4 p-3 bg-gray-900 rounded-md overflow-x-auto">
              <p className="text-xs text-gray-400 mb-2">Respuesta en crudo de la API (JSONPlaceholder):</p>
              <pre className="text-sm text-green-400 font-mono">
                {JSON.stringify(state.createdPost, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Mensaje de Error General */}
      {state.error && !state.success && (
        <p role="alert" className="text-sm font-semibold text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
          {state.error}
        </p>
      )}

      {/* Solo mostramos los inputs si NO ha sido exitoso (para que quede limpio) */}
      {!state.success && (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="userId" className="text-sm font-medium text-gray-700">User ID</label>
            <input id="userId" name="userId" type="number" defaultValue={state.data?.userId} className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ingresa el UserID" />
            {state.fieldErrors?.userId?.map((err, i) => (
              <p key={i} className="text-xs text-red-500">{err}</p>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-sm font-medium text-gray-700">Post ID</label>
            <input id="id" name="id" type="number" defaultValue={state.data?.id} className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ingresa el PostID" />
            {state.fieldErrors?.id?.map((err, i) => (
              <p key={i} className="text-xs text-red-500">{err}</p>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">Título</label>
            <input id="title" name="title" type="text" defaultValue={state.data?.title} className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Ingresa el titulo" />
            {state.fieldErrors?.title?.map((err, i) => (
              <p key={i} className="text-xs text-red-500">{err}</p>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="body" className="text-sm font-medium text-gray-700">Contenido</label>
            <textarea id="body" name="body" rows={4} defaultValue={state.data?.body} className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="ingresa el contenido" />
            {state.fieldErrors?.body?.map((err, i) => (
              <p key={i} className="text-xs text-red-500">{err}</p>
            ))}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Submitting…' : 'Submit'}
          </Button>
        </>
      )}
    </form>
  )
}
