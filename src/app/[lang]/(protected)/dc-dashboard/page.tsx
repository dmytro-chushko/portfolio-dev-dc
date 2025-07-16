/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '...',
};

export default async function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
      <a href="/auth/logout">Logout</a>
    </div>
  );
}
