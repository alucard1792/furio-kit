import { z } from 'zod';

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  role: z.enum(['admin', 'member', 'viewer']),
});

export const SessionSchema = z.object({
  user: AuthUserSchema,
  /** Unix timestamp (seconds) when the session expires */
  expiresAt: z.number(),
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
export type Session = z.infer<typeof SessionSchema>;
