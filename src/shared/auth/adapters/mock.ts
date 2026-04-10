import type { NextRequest } from 'next/server';
import type { AuthAdapter } from '../auth-adapter';
import { SessionSchema } from '../types';
import type { Session } from '../types';

/**
 * Mock auth adapter for local development.
 *
 * Behavior:
 *   - Returns `null` (unauthenticated) by default.
 *   - When the `MOCK_AUTH_USER` env var is set to any non-empty value,
 *     returns a mock admin session so you can develop authenticated UIs
 *     without running a real identity provider.
 *
 * ⚠️  NEVER set MOCK_AUTH_USER in production. Gate on NODE_ENV if needed.
 */
export const mockAdapter: AuthAdapter = {
  async getSession(_request: NextRequest): Promise<Session | null> {
    if (!process.env.MOCK_AUTH_USER) return null;

    return SessionSchema.parse({
      user: {
        id: 'mock-user-1',
        email: 'dev@example.com',
        name: 'Dev User',
        role: 'admin',
      },
      expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 8, // 8 hours
    });
  },

  getLoginUrl(returnTo = '/') {
    return `/login?returnTo=${encodeURIComponent(returnTo)}`;
  },

  getLogoutUrl(returnTo = '/') {
    return `/logout?returnTo=${encodeURIComponent(returnTo)}`;
  },

  async validateRequest(request: NextRequest): Promise<Session | null> {
    return this.getSession(request);
  },
};
