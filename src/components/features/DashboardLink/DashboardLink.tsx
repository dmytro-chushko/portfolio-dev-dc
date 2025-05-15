'use client';

import { useUser } from '@auth0/nextjs-auth0';

import NavLink from '@/components/ui/NavLink/NavLink';

const DashboardLink = () => {
  const { user } = useUser();

  return user ? <NavLink label="Dashboard" href="/dc-dashboard" /> : null;
};

export default DashboardLink;
