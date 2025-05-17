import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '...',
};

export default async function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
      <Link href="/auth/logout">Logout</Link>
    </div>
  );
}
