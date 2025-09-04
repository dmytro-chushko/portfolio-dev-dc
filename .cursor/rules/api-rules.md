# API & Server Actions Rules

## Server Actions

- Use proper validation with Yup schemas
- Implement proper error handling
- Use revalidation for cache updates
- Follow the pattern in `src/app/actions/`

## Server Action Patterns

### Basic Server Action

```typescript
// ✅ Use proper server action structure
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createHeroVariantAction } from '@/app/actions/createHeroVariantAction';

export async function handleCreateHero(formData: FormData) {
  try {
    const result = await createHeroVariantAction(formData);

    if (result.success) {
      revalidatePath('/[lang]');
      redirect('/[lang]');
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error creating hero:', error);
    throw new Error('Failed to create hero');
  }
}
```

### Form Validation

```typescript
// ✅ Use Yup validation in server actions
'use server';

import * as yup from 'yup';
import { revalidatePath } from 'next/cache';

const createHeroSchema = yup.object({
  heroVersion: yup.string().required().min(1).max(100),
  heroPhoto: yup.string().required().url(),
  translations: yup
    .array()
    .of(
      yup.object({
        languageId: yup.string().required(),
        heroName: yup.string().required().min(1).max(200),
        heroDescription: yup.string().required().min(1).max(1000),
      })
    )
    .required()
    .min(1),
});

export async function createHeroAction(formData: FormData) {
  try {
    // Extract and validate data
    const data = {
      heroVersion: formData.get('heroVersion') as string,
      heroPhoto: formData.get('heroPhoto') as string,
      translations: JSON.parse(formData.get('translations') as string),
    };

    const validatedData = await createHeroSchema.validate(data);

    // Create hero
    const hero = await createHero(validatedData);

    // Revalidate cache
    revalidatePath('/[lang]');

    return { success: true, data: hero };
  } catch (error) {
    console.error('Error creating hero:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
```

### Error Handling

```typescript
// ✅ Implement proper error handling
'use server';

import { CustomError } from '@/lib/errors/CustomError';
import { PayloadValidationError } from '@/lib/errors/PayloadValidationError';

export async function updateHeroAction(heroId: string, formData: FormData) {
  try {
    // Validate heroId
    if (!heroId || typeof heroId !== 'string') {
      throw new PayloadValidationError('Invalid hero ID');
    }

    // Extract and validate data
    const data = extractFormData(formData);
    const validatedData = await validateHeroData(data);

    // Update hero
    const hero = await updateHero(heroId, validatedData);

    // Revalidate cache
    revalidatePath('/[lang]');

    return { success: true, data: hero };
  } catch (error) {
    if (error instanceof CustomError) {
      return { success: false, error: error.message };
    }

    console.error('Unexpected error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
```

## API Routes

### Basic API Route

```typescript
// ✅ Use proper API route structure
import { NextRequest, NextResponse } from 'next/server';
import { getHeroes } from '@/lib/services/dbServices/heroService';

export async function GET(request: NextRequest) {
  try {
    const heroes = await getHeroes();

    return NextResponse.json({
      success: true,
      data: heroes,
    });
  } catch (error) {
    console.error('Error fetching heroes:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch heroes',
      },
      { status: 500 }
    );
  }
}
```

### POST API Route

```typescript
// ✅ Handle POST requests properly
import { NextRequest, NextResponse } from 'next/server';
import { createHero } from '@/lib/services/dbServices/heroService';
import * as yup from 'yup';

const createHeroSchema = yup.object({
  heroVersion: yup.string().required(),
  heroPhoto: yup.string().required(),
  translations: yup.array().required(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = await createHeroSchema.validate(body);

    // Create hero
    const hero = await createHero(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: hero,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Error creating hero:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create hero',
      },
      { status: 500 }
    );
  }
}
```

### PUT API Route

```typescript
// ✅ Handle PUT requests properly
import { NextRequest, NextResponse } from 'next/server';
import { updateHero } from '@/lib/services/dbServices/heroService';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validate ID
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid hero ID' },
        { status: 400 }
      );
    }

    // Update hero
    const hero = await updateHero(id, body);

    if (!hero) {
      return NextResponse.json(
        { success: false, error: 'Hero not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: hero,
    });
  } catch (error) {
    console.error('Error updating hero:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update hero',
      },
      { status: 500 }
    );
  }
}
```

### DELETE API Route

```typescript
// ✅ Handle DELETE requests properly
import { NextRequest, NextResponse } from 'next/server';
import { deleteHero } from '@/lib/services/dbServices/heroService';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid hero ID' },
        { status: 400 }
      );
    }

    // Delete hero
    const success = await deleteHero(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Hero not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Hero deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting hero:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete hero',
      },
      { status: 500 }
    );
  }
}
```

## Error Handling

### Custom Error Types

```typescript
// ✅ Use custom error types
import { CustomError } from '@/lib/errors/CustomError';
import { PayloadValidationError } from '@/lib/errors/PayloadValidationError';
import { StorageError } from '@/lib/errors/StorageError';

export async function handleApiError(error: unknown) {
  if (error instanceof PayloadValidationError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }

  if (error instanceof StorageError) {
    return NextResponse.json(
      { success: false, error: 'Storage error occurred' },
      { status: 500 }
    );
  }

  if (error instanceof CustomError) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  console.error('Unexpected error:', error);
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  );
}
```

### Validation Error Handling

```typescript
// ✅ Handle validation errors properly
export async function validateRequest<T>(
  data: unknown,
  schema: yup.Schema<T>
): Promise<T> {
  try {
    return await schema.validate(data, { abortEarly: false });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new PayloadValidationError('Validation failed', error.errors);
    }
    throw error;
  }
}
```

## Caching and Revalidation

### Cache Revalidation

```typescript
// ✅ Use proper cache revalidation
import { revalidatePath, revalidateTag } from 'next/cache';

export async function updateHeroAction(heroId: string, data: HeroData) {
  try {
    const hero = await updateHero(heroId, data);

    // Revalidate specific paths
    revalidatePath('/[lang]');
    revalidatePath('/[lang]/dc-dashboard');

    // Revalidate specific tags
    revalidateTag('heroes');
    revalidateTag(`hero-${heroId}`);

    return { success: true, data: hero };
  } catch (error) {
    console.error('Error updating hero:', error);
    return { success: false, error: 'Failed to update hero' };
  }
}
```

### Cache Tags

```typescript
// ✅ Use cache tags for granular revalidation
export async function getHeroes() {
  const heroes = await prisma.hero.findMany({
    include: {
      translations: {
        include: {
          language: true,
        },
      },
    },
    next: {
      tags: ['heroes'],
    },
  });

  return heroes;
}
```

## Rate Limiting

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
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { success: false, error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  // Continue with request processing
}
```

## Authentication

```typescript
// ✅ Implement authentication in API routes
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession(request);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Continue with authenticated request
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
```

## Best Practices

- Use proper validation with Yup schemas
- Implement proper error handling
- Use revalidation for cache updates
- Follow RESTful conventions
- Use proper HTTP status codes
- Implement proper authentication
- Use rate limiting where appropriate
- Use cache tags for granular revalidation
- Handle validation errors properly
- Use custom error types
- Implement proper logging
- Use proper TypeScript types
- Follow the established patterns in the codebase
- Use proper request/response formats
- Implement proper security measures
- Use proper error messages
- Handle edge cases properly

