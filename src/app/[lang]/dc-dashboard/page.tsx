import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '...',
};

export default async function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
    </div>
  );
}
