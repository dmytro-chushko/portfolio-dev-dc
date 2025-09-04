# Next.js Rules

## App Router Patterns

- Use App Router (not Pages Router)
- Prefer Server Components over Client Components
- Use proper file conventions (page.tsx, layout.tsx, loading.tsx, error.tsx)
- Implement proper error boundaries

## File Structure

```
src/app/
├── [lang]/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   ├── (auth)/            # Route group
│   │   ├── layout.tsx     # Auth layout
│   │   └── login/
│   │       └── page.tsx   # Login page
│   ├── (protected)/       # Route group
│   │   ├── layout.tsx     # Protected layout
│   │   └── dc-dashboard/
│   │       └── page.tsx   # Dashboard page
│   └── (public)/          # Route group
│       ├── layout.tsx     # Public layout
│       └── page.tsx       # Public page
├── actions/               # Server Actions
├── api/                   # API routes
└── global-error.tsx       # Global error boundary
```

## Server Components vs Client Components

### Server Components (Default)

```typescript
// ✅ Use Server Components for data fetching
import { getHeroes } from '@/lib/services/dbServices/heroService';

export default async function HeroList() {
  const heroes = await getHeroes();

  return (
    <div>
      {heroes.map(hero => (
        <HeroItem key={hero.id} hero={hero} />
      ))}
    </div>
  );
}
```

### Client Components

```typescript
// ✅ Use Client Components for interactivity
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </div>
  );
}
```

## Server Actions

```typescript
// ✅ Use Server Actions for form submissions
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createHeroVariantAction } from '@/app/actions/createHeroVariantAction';

export async function handleCreateHero(formData: FormData) {
  try {
    await createHeroVariantAction(formData);
    revalidatePath('/[lang]');
    redirect('/[lang]');
  } catch (error) {
    // Handle error
  }
}
```

## Layout Patterns

```typescript
// ✅ Root layout with providers
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## Error Handling

```typescript
// ✅ Error boundary
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
```

## Loading States

```typescript
// ✅ Loading component
export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  );
}
```

## Internationalization

```typescript
// ✅ Use next-intl for i18n
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Client component
export function ClientComponent() {
  const t = useTranslations('hero');

  return <h1>{t('title')}</h1>;
}

// Server component
export default async function ServerComponent() {
  const t = await getTranslations('hero');

  return <h1>{t('title')}</h1>;
}
```

## Image Optimization

```typescript
// ✅ Use Next.js Image component
import Image from 'next/image';

export function OptimizedImage() {
  return (
    <Image
      src="/hero-photo-placeholder.png"
      alt="Hero photo"
      width={300}
      height={300}
      priority
      className="rounded-lg"
    />
  );
}
```

## Metadata

```typescript
// ✅ Use metadata API
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dev DC Portfolio',
  description: 'Portfolio website for Dev DC',
  openGraph: {
    title: 'Dev DC Portfolio',
    description: 'Portfolio website for Dev DC',
    images: ['/og-image.jpg'],
  },
};
```

## Dynamic Routes

```typescript
// ✅ Use dynamic routes with proper typing
export default function LanguagePage({
  params,
}: {
  params: { lang: string };
}) {
  return <div>Language: {params.lang}</div>;
}

// ✅ Generate static params
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'ua' },
  ];
}
```

## API Routes

```typescript
// ✅ Use proper API route structure
import { NextRequest, NextResponse } from 'next/server';
import { getHeroes } from '@/lib/services/dbServices/heroService';

export async function GET(request: NextRequest) {
  try {
    const heroes = await getHeroes();
    return NextResponse.json({ data: heroes });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch heroes' },
      { status: 500 }
    );
  }
}
```

## Middleware

```typescript
// ✅ Use middleware for authentication and i18n
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middlewares/withAuth';
import { withLocale } from '@/middlewares/withLocale';

export function middleware(request: NextRequest) {
  return withAuth(withLocale(request));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

## Best Practices

- Use Server Components by default
- Only use Client Components when necessary
- Implement proper error boundaries
- Use proper loading states
- Optimize images with Next.js Image
- Use proper metadata for SEO
- Implement proper internationalization
- Use Server Actions for form submissions
- Follow the established file structure
- Use proper TypeScript types
- Implement proper error handling
- Use proper caching strategies
- Optimize for performance

