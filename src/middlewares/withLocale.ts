import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types';

const locales = ['en', 'ua'];

// Get the preferred locale, similar to the above or using a library
const getLocale = (request: NextRequest): string => {
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    const browserLocales = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim());

    const matchedLocale = browserLocales.find((lang) => locales.includes(lang));

    if (matchedLocale) {
      return matchedLocale;
    }
  }

  return 'en';
};

export const withLocale: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return next(request, _next);

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
  };
};
