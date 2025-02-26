import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import { langs } from '@/lib/utils/getDictionary';

import { MiddlewareFactory } from './types';

// Get the preferred locale, similar to the above or using a library
const getLocale = (request: NextRequest): string => {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (cookieLocale && langs.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    const browserLocales = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim());

    const matchedLocale = browserLocales.find((lang) => langs.includes(lang));

    if (matchedLocale) {
      return matchedLocale;
    }
  }

  return 'en';
};

export const withLocale: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = langs.some(
      (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
    );

    if (pathnameHasLocale) return next(request, _next);

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
  };
};
