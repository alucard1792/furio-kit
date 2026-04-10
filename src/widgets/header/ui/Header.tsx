import Link from 'next/link';

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'My App';

// Server Component — no interactivity needed at this level.
// If a mobile menu or active-link highlight is added, extract that piece as "use client".
export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-gray-900"
        >
          {appName}
        </Link>
        <nav className="flex gap-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-900">
            About
          </Link>
          <Link href="/pokemon" className="text-sm font-medium hover:underline">
            Pokédex
          </Link>
          <Link href="/post" className="text-sm font-medium hover:underline">
            Post
          </Link>
          <Link href="/post/table" className="text-sm font-medium hover:underline">
            Post Table
          </Link>
        </nav>
      </div>
    </header>
  );
}
