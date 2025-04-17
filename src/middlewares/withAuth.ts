import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { auth0Client } from '@/lib/clients/auth0Client';

import { MiddlewareFactory } from './types';

const protectedRoutes = ['dc-dashboard'];

export const withAuth: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = req.nextUrl;

    const isProtected = protectedRoutes.includes(pathname.slice(4));

    const authRes = await auth0Client.middleware(req);

    if (req.nextUrl.pathname.startsWith('/auth')) {
      return authRes;
    }

    if (!isProtected) {
      return next(req, _next);
    }

    const session = await auth0Client.getSession(req);

    if (!session) {
      return NextResponse.redirect(
        new URL('/auth/login?returnTo=/dc-dashboard', req.nextUrl.origin)
      );
    }

    return next(req, _next);
  };
};
