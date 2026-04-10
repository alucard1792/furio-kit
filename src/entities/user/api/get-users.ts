import { z } from 'zod';
import { UserSchema } from '../model/types';

const UsersResponseSchema = z.array(UserSchema);

// DEV fallback — used when NEXT_PUBLIC_API_URL is not configured
const DEV_MOCK = [
  { id: '1', name: 'Alex Rivera', email: 'alex@example.com', role: 'admin' },
  { id: '2', name: 'Sam Okoro', email: 'sam@example.com', role: 'member' },
  { id: '3', name: 'Jamie Chen', email: 'jamie@example.com', role: 'viewer' },
];

export async function getUsers() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    // No backend configured — return mock data so local dev works out of the box
    return UsersResponseSchema.parse(DEV_MOCK);
  }

  const res = await fetch(`${apiUrl}/users`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  return UsersResponseSchema.parse(await res.json());
}
