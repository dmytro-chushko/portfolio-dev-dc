# Security Rules

## Authentication

- Use Auth0 for authentication
- Implement proper session management
- Protect sensitive routes
- Validate user permissions

## Data Security

- Validate all inputs
- Use proper SQL injection prevention (Prisma)
- Implement proper CORS policies
- Use environment variables for secrets

## Authentication Patterns

### Auth0 Integration

```typescript
// ✅ Use Auth0 for authentication
import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession(request);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Continue with authenticated request
    return NextResponse.json({ success: true, data: 'Protected data' });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
```

### Session Management

```typescript
// ✅ Implement proper session management
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export const handler = withApiAuthRequired(async function handler(req, res) {
  try {
    const session = await getSession(req, res);

    if (!session) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Check session expiration
    if (session.expiresAt && new Date() > new Date(session.expiresAt)) {
      return res.status(401).json({ error: 'Session expired' });
    }

    // Continue with authenticated request
    res.json({ success: true, user: session.user });
  } catch (error) {
    console.error('Session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Route Protection

```typescript
// ✅ Protect sensitive routes
import { withAuth } from '@/middlewares/withAuth';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  return withAuth(request);
}

export const config = {
  matcher: ['/dc-dashboard/:path*', '/admin/:path*'],
};
```

## Input Validation

### Server-Side Validation

```typescript
// ✅ Validate all inputs on the server
import * as yup from 'yup';
import { PayloadValidationError } from '@/lib/errors/PayloadValidationError';

const createHeroSchema = yup.object({
  heroVersion: yup
    .string()
    .required()
    .min(1)
    .max(100)
    .matches(/^[a-zA-Z0-9._-]+$/, 'Invalid hero version format'),
  heroPhoto: yup
    .string()
    .required()
    .url()
    .matches(/\.(jpg|jpeg|png|gif|webp)$/i, 'Invalid image format'),
  translations: yup
    .array()
    .of(
      yup.object({
        languageId: yup.string().required().uuid(),
        heroName: yup
          .string()
          .required()
          .min(1)
          .max(200)
          .matches(/^[a-zA-Zа-яА-Я0-9\s._-]+$/, 'Invalid name format'),
        heroDescription: yup
          .string()
          .required()
          .min(1)
          .max(1000)
          .matches(/^[a-zA-Zа-яА-Я0-9\s._-]+$/, 'Invalid description format'),
      })
    )
    .required()
    .min(1),
});

export async function validateHeroData(data: unknown) {
  try {
    return await createHeroSchema.validate(data, { abortEarly: false });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new PayloadValidationError('Validation failed', error.errors);
    }
    throw error;
  }
}
```

### Client-Side Validation

```typescript
// ✅ Validate inputs on the client side
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .matches(/^[a-zA-Zа-яА-Я\s]+$/, 'Name can only contain letters and spaces'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
});

export function ContactForm() {
  const form = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onBlur',
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <StyledInput
        {...form.register('name')}
        error={form.formState.errors.name?.message}
        placeholder="Your name"
      />
      <StyledInput
        {...form.register('email')}
        type="email"
        error={form.formState.errors.email?.message}
        placeholder="Your email"
      />
      <StyledTextarea
        {...form.register('message')}
        error={form.formState.errors.message?.message}
        placeholder="Your message"
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
```

## SQL Injection Prevention

### Prisma Usage

```typescript
// ✅ Use Prisma to prevent SQL injection
import { prisma } from '@/lib/clients/prismaClient';

export async function getHeroesByVersion(version: string): Promise<Hero[]> {
  // ✅ Prisma automatically prevents SQL injection
  return await prisma.hero.findMany({
    where: {
      heroVersion: version, // Safe from SQL injection
    },
  });
}

// ❌ Never use raw SQL queries
export async function getHeroesByVersionUnsafe(
  version: string
): Promise<Hero[]> {
  // ❌ This is vulnerable to SQL injection
  return await prisma.$queryRaw`
    SELECT * FROM heroes WHERE hero_version = ${version}
  `;
}
```

### Parameterized Queries

```typescript
// ✅ Use parameterized queries when necessary
export async function getHeroesByVersionSafe(version: string): Promise<Hero[]> {
  // ✅ Use parameterized queries
  return (
    await prisma.$queryRaw`
    SELECT * FROM heroes WHERE hero_version = $1
  `,
    [version]
  );
}
```

## CORS Configuration

### API CORS

```typescript
// ✅ Implement proper CORS policies
import { NextRequest, NextResponse } from 'next/server';

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin':
        process.env.ALLOWED_ORIGINS || 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ data: 'Hello World' });

  // Add CORS headers
  response.headers.set(
    'Access-Control-Allow-Origin',
    process.env.ALLOWED_ORIGINS || 'http://localhost:3000'
  );
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  return response;
}
```

## Environment Variables

### Secret Management

```typescript
// ✅ Use environment variables for secrets
const config = {
  database: {
    url: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL,
  },
  auth0: {
    secret: process.env.AUTH0_SECRET,
    baseUrl: process.env.AUTH0_BASE_URL,
    issuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
};

// ✅ Validate required environment variables
function validateEnvironment() {
  const required = [
    'DATABASE_URL',
    'AUTH0_SECRET',
    'AUTH0_BASE_URL',
    'AUTH0_ISSUER_BASE_URL',
    'AUTH0_CLIENT_ID',
    'AUTH0_CLIENT_SECRET',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

validateEnvironment();
```

## Rate Limiting

### API Rate Limiting

```typescript
// ✅ Implement rate limiting
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Rate limit exceeded',
        limit,
        reset,
        remaining,
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString(),
        },
      }
    );
  }

  // Continue with request processing
}
```

## Content Security Policy

### CSP Headers

```typescript
// ✅ Implement Content Security Policy
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' data:; " +
      "connect-src 'self' https://*.auth0.com https://*.supabase.co; " +
      "frame-ancestors 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self';"
  );

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}
```

## File Upload Security

### Image Upload Validation

```typescript
// ✅ Validate file uploads
import { StorageError } from '@/lib/errors/StorageError';

export async function validateImageUpload(file: File): Promise<void> {
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new StorageError('File size must be less than 5MB');
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new StorageError(
      'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed'
    );
  }

  // Check file extension
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const fileExtension = file.name
    .toLowerCase()
    .substring(file.name.lastIndexOf('.'));
  if (!allowedExtensions.includes(fileExtension)) {
    throw new StorageError('Invalid file extension');
  }

  // Check for malicious content (basic check)
  if (
    file.name.includes('..') ||
    file.name.includes('/') ||
    file.name.includes('\\')
  ) {
    throw new StorageError('Invalid file name');
  }
}
```

## XSS Prevention

### Input Sanitization

```typescript
// ✅ Sanitize user inputs
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: [],
  });
}
```

### Output Encoding

```typescript
// ✅ Encode outputs to prevent XSS
export function encodeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
```

## Best Practices

- Use Auth0 for authentication
- Implement proper session management
- Protect sensitive routes
- Validate all inputs
- Use Prisma to prevent SQL injection
- Implement proper CORS policies
- Use environment variables for secrets
- Implement rate limiting
- Use Content Security Policy
- Validate file uploads
- Sanitize user inputs
- Encode outputs
- Use proper error handling
- Log security events
- Keep dependencies updated
- Use HTTPS in production
- Implement proper access controls
- Use secure headers
- Follow the established security patterns
- Regular security audits
- Use proper authentication flows
- Implement proper authorization
- Use secure communication protocols
- Follow the principle of least privilege

