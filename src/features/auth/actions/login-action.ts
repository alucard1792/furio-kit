'use server'

import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export interface LoginActionState {
  error?: string
  success?: boolean
}

/**
 * Server Action: validates credentials and sets an HttpOnly session cookie.
 *
 * Implementation notes:
 *   1. Call your auth adapter / identity provider to exchange credentials for a token.
 *   2. Set the token in an HttpOnly, Secure, SameSite=Strict cookie via `cookies()`.
 *   3. Never store tokens in localStorage or return them to the client.
 *
 * Example (uncomment and adapt):
 *
 *   import { cookies } from 'next/headers'
 *   const token = await identityProvider.authenticate(email, password)
 *   cookies().set('session', token, {
 *     httpOnly: true,
 *     secure: process.env.NODE_ENV === 'production',
 *     sameSite: 'strict',
 *     maxAge: 60 * 60 * 8, // 8 hours
 *     path: '/',
 *   })
 */
export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const result = LoginSchema.safeParse(raw)
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { email: _email, password: _password } = result.data

  // TODO: Replace with real authentication call
  // e.g. const session = await authAdapter.authenticate(email, password)
  // Set HttpOnly cookie on success (see notes above)

  return { error: 'Authentication not configured. Connect an auth adapter.' }
}
